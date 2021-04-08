import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-edit-votebook',
  styleUrls: ['./edit-votebook.component.scss'],
  templateUrl: './edit-votebook.component.html',
})
export class EditVotebookComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject();
  private _cacheId: string;
  private _orderPaperId: string;

  content = new FormControl('', Validators.required);

  words = 0;
  previousPage: number;
  currentPage: number;
  title: string;
  orderPaperContent: string[];

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
    }>(this._cacheId);

    if (!cached) {
      this.location.back();
      return;
    }

    const { orderPaperContent, page, title, form } = cached;

    this.orderPaperContent = orderPaperContent;
    this.previousPage = page - 1;
    this.currentPage = page;
    this.title = title;
    this._orderPaperId = form.get('orderPaperId').value;

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
    this.cacheService.cache<{ content: string }, undefined>(
      'EDIT_VOTEBOOK_PREVIEW',
      { content: this.content.value },
      undefined,
      (cached) => {
        this.cacheService.emit(this._cacheId, cached.content);

        return cached;
      }
    );

    this.router.navigate(['/edit/votebook/preview']);
  }

  onDiscard() {
    this.location.back();
  }
}
