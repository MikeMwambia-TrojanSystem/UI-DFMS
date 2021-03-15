import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class MessagePreviewComponent implements OnInit {
  private _cacheId: string;

  form = this.fb.group({
    content: ['', Validators.required],
    source: ['', Validators.required],
    uploadedLocation: ['', Validators.required],
  });

  page = `Order Paper on the Development of Kura`;
  wordsNumber = 0;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    const { form } = this.cacheService.getData<{
      form: FormGroup;
    }>('EDIT_MESSAGE');

    const content = form.get('content').value;

    this.form.setValue({ ...form.value });
    this.wordsNumber = (content.match(/ /g) || []).length;

    if (content.length && content.slice(content.length - 1) !== ' ') {
      this.wordsNumber++;
    }
  }

  onComplete() {
    const { page } = this.cacheService.getData<{ page: number }>(this._cacheId);
    const { content, uploadedLocation, source } = this.form.value;
    const message = `content=${content}|||source=${source}|||uploadedLocation=${uploadedLocation}`;

    this.cacheService.clearCache('EDIT_MESSAGE');
    this.cacheService.emit(this._cacheId, {
      message,
      page,
    });
  }
}
