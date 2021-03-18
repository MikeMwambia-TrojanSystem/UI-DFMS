import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { Motion } from 'src/app/shared/types/motion';

@Component({
  templateUrl: './edit-motion.component.html',
  styleUrls: ['./edit-motion.component.scss'],
})
export class EditMotionComponent {
  private $onDestroy = new Subject();
  private _cacheId: string;

  content = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  motionId = new FormControl('', Validators.required);

  words = 0;
  previousPage: number;
  currentPage: number;
  title: string;
  orderPaperContent: string[];
  motions: Motion[];

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get query param
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Get cached data
    const cached = this.cacheService.getData<{
      form: FormGroup;
      orderPaperContent: string[];
      page: number;
      title: string;
      motions: Motion[];
    }>(this._cacheId);

    if (!cached) {
      this.location.back();
      return;
    }

    const { orderPaperContent, page, title, form, motions } = cached;

    this.orderPaperContent = orderPaperContent;
    this.previousPage = page - 1;
    this.currentPage = page;
    this.title = title;
    this.motions = motions;

    // Subscription to the form content to count the number of words
    this.content.valueChanges
      .pipe(takeUntil(this.$onDestroy))
      .subscribe((content: string) => {
        this.words = ((content && content.match(/ /g)) || []).length;

        if (
          content &&
          content.charAt(content.length - 1) !== ' ' &&
          content.length
        ) {
          this.words++;
        }
      });
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  onPublish() {
    this.cacheService.cache<
      { content: string; status: string; motionId: string },
      undefined
    >(
      'EDIT_VOTEBOOK_PREVIEW',
      {
        content: this.content.value,
        status: this.status.value,
        motionId: this.motionId.value,
      },
      undefined,
      (cached) => {
        this.cacheService.emit(this._cacheId, {
          content: cached.content,
          status: cached.status,
          motionId: cached.motionId,
        });

        return cached;
      }
    );

    this.router.navigate(['/edit/motion/preview']);
  }
}
