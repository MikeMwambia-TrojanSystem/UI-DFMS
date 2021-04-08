import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class VotebookNoticeMotionPreviewComponent implements OnInit {
  content = new FormControl('', Validators.required);
  status = new FormControl({ value: '', disabled: true }, Validators.required);

  page = 'Order Paper on the Development of Kura';

  wordsNumber: number;

  constructor(private cacheService: CacheService, private location: Location) {}

  ngOnInit(): void {
    const { content, status } = this.cacheService.getData<{
      content: string;
      status: string;
    }>('EDIT_VOTEBOOK_PREVIEW');

    this.content.setValue(content);
    this.status.setValue(status);

    this.wordsNumber = ((content && content.match(/ /g)) || []).length;

    if (
      content &&
      content.charAt(content.length - 1) !== ' ' &&
      content.length
    ) {
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
