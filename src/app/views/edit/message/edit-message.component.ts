import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { Upload } from 'src/app/shared/types/upload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss'],
})
export class EditMessageComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject();
  private _cacheId: string;
  private _page: number;

  form = this.fb.group({
    content: ['', Validators.required],
    source: ['testsource'],
    uploadedLocation: ['', Validators.required],
  });

  id: string;

  words = 0;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private location: Location,
    private fb: FormBuilder,
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

      this._page = cachedData.page;

      const cachedContent = this.cacheService.rehydrate<{ form: FormGroup }>(
        'EDIT_MESSAGE'
      );

      if (cachedContent) {
        this.form.setValue({
          ...cachedContent.form.value,
        });
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

        if (content.length && content.slice(content.length - 1) !== ' ') {
          this.words++;
        }
      });
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  onUpload() {
    this.cacheService.cache<{ form: FormGroup }, { result: Upload }>(
      'EDIT_MESSAGE',
      {
        form: this.form,
      },
      this.router.createUrlTree(['/edit/message'], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form }, { result }) => {
        form.get('uploadedLocation').setValue(result.location);

        return {
          form,
        };
      }
    );

    this.router.navigate(['/management/upload'], {
      queryParams: {
        id: 'EDIT_MESSAGE',
        category: 'message',
      },
    });
  }

  onPreview() {
    this.cacheService.cache('EDIT_MESSAGE', {
      form: this.form,
      page: this._page,
    });

    this.router.navigate(['/edit/message/preview'], {
      queryParams: {
        id: this._cacheId,
      },
    });
  }
}
