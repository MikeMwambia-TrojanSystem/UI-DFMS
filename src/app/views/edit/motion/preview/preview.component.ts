import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { MotionService } from 'src/app/services/motion.service';
import { Motion } from 'src/app/shared/types/motion';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class VotebookMotionPreviewComponent implements OnInit {
  content = new FormControl('', Validators.required);
  status = new FormControl({ value: '', disabled: true }, Validators.required);
  motionId = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );

  page = 'Order Paper on the Development of Kura';
  wordsNumber: number;
  motion: Motion;

  constructor(
    private cacheService: CacheService,
    private motionService: MotionService
  ) {}

  ngOnInit(): void {
    const { content, status, motionId } = this.cacheService.getData<{
      content: string;
      status: string;
      motionId: string;
    }>('EDIT_VOTEBOOK_PREVIEW');

    this.content.setValue(content);
    this.status.setValue(status);
    this.motionId.setValue(motionId);

    this.motionService
      .getMotion(motionId)
      .pipe(take(1))
      .subscribe((motion) => {
        console.log(motion);
        this.motion = motion;
      });

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
}
