import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss'],
})
export class EditContentComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject();
  private _cacheId: string;

  form = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  words = 0;
  page: number;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get cache id from query url
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Get cached data
    try {
      const cachedData = this.cacheService.getData<{
        page: number;
      }>(this._cacheId);

      if (!cachedData) {
        throw new Error('No cached data');
      }

      this.page = cachedData.page;

      const cachedContent = this.cacheService.rehydrate<{ content: string }>(
        'EDIT_CONTENT'
      );

      if (cachedContent) {
        this.form.get('content').setValue(cachedContent.content);
      }
    } catch (error) {
      this.location.back();
    }

    // Subscription to the form content to count the number of words
    this.form
      .get('content')
      .valueChanges.pipe(takeUntil(this.$onDestroy))
      .subscribe((content: string) => {
        this.words = ((content && content.match(/ /g)) || []).length;

        if (content.slice(content.length - 1) !== ' ') {
          this.words++;
        }
      });
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  onPreview(): void {
    this.cacheService.cache('EDIT_CONTENT', {
      content: this.form.get('content').value,
    });

    this.router.navigate(['/edit/content/preview'], {
      queryParams: {
        id: this._cacheId,
      },
    });
  }
}
