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
export class VotebookPreviewComponent implements OnInit {
  content = new FormControl('', Validators.required);

  page = 'Order Paper on the Development of Kura';

  wordsNumber = 0;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const { content } = this.cacheService.getData<{ content: string }>(
      'EDIT_VOTEBOOK_PREVIEW'
    );

    this.content.setValue(content);

    this.wordsNumber = ((content && content.match(/ /g)) || []).length;

    if (content.slice(content.length - 1) !== ' ') {
      this.wordsNumber++;
    }
  }

  onComplete() {
    this.cacheService.emit('EDIT_VOTEBOOK_PREVIEW', undefined);
  }

  onDiscard() {
    this.location.back();
  }
}
