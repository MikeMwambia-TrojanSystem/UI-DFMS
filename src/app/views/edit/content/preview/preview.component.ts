import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class ContentPreviewComponent implements OnInit {
  private _cacheId: string;

  content = new FormControl('', Validators.required);

  page = `Order Paper on the Development of Kura`;

  wordsNumber: number;
  // wordsPara = 1400;
  // wordsPage = 1400;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    const { content } = this.cacheService.getData<{
      content: string;
    }>('EDIT_CONTENT');

    this.content.setValue(content);
    this.wordsNumber = (content.match(/ /g) || []).length;

    if (content.slice(content.length - 1) !== ' ') {
      this.wordsNumber++;
    }
  }

  onComplete() {
    const { page } = this.cacheService.getData<{ page: number }>(this._cacheId);

    this.cacheService.clearCache('EDIT_CONTENT');

    this.cacheService.emit(this._cacheId, {
      content: this.content.value,
      page,
    });
  }

  onDiscard() {
    this.location.back();
  }
}
