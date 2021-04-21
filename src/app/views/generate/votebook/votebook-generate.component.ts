import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {
  CacheConfigs,
  CachedCallback,
  CacheService,
} from 'src/app/services/cache.service';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { VotebookService } from 'src/app/services/votebook.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { Speaker } from 'src/app/shared/types/speaker';
import { Votebook } from 'src/app/shared/types/votebook';

type Cache = {
  form: FormGroup;
};

@Component({
  selector: 'app-generate-votebook',
  templateUrl: './votebook-generate.component.html',
  styleUrls: ['./votebook-generate.component.scss'],
})
export class VotebookGenerateComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject<void>();
  private _votebookId: string;
  private _cacheId: string;

  form = this.fb.group({
    orderPaperId: [{ value: '', disabled: true }, Validators.required],
    assemblyId: [{ value: '1234', disabled: true }],
    assemblyNo: [{ value: '', disabled: true }, Validators.required],
    orderPapersNo: [{ value: '', disabled: true }, Validators.required],
    pageNoToDate: [{ value: '', disabled: true }, Validators.required],
    sessionNo: [{ value: '', disabled: true }, Validators.required],
    votebookNo: ['', Validators.required],
    presiding: ['', Validators.required],
    presidingPosition: [''],
    presidingId: [''],
  });
  speaker: Speaker;
  valid = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get query param
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Get resolved order paper data
    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          speaker,
          votebook,
          orderPaper,
        }: {
          speaker: Speaker;
          votebook: Votebook;
          orderPaper: OrderPaper;
        }) => {
          this.speaker = speaker;

          if (votebook) {
            this._votebookId = votebook._id;

            const {
              assemblyId,
              assemblyNo,
              orderPapersNo,
              sessionNo,
              votebookNo,
            } = votebook;

            this.form.patchValue({
              pageNoToDate: orderPaper.pageNoToDate,
              orderPaperId: orderPaper._id,
              assemblyId,
              assemblyNo,
              orderPapersNo,
              sessionNo,
              votebookNo,
            });
          }
        }
      );

    // Get cached data
    const cachedData = this.cacheService.rehydrate<Cache>('GENERATE_VOTEBOOK');

    if (cachedData) {
      this.form = cachedData.form;
    }

    this.form
      .get('presidingPosition')
      .valueChanges.pipe(takeUntil(this.$onDestroy))
      .subscribe(() => {
        this.form.patchValue({
          presiding:
            this.presidingPosition === 'Speaker of the Assembly'
              ? this.speaker.name
              : '',
          presidingId:
            this.presidingPosition === 'Speaker of the Assembly'
              ? this.speaker._id
              : '',
        });
      });

    const value = this.form.value;
    const orderPaperId = this.form.get('orderPaperId').value;

    this.valid =
      !!orderPaperId &&
      !!orderPaperId.length &&
      !!(value.presidingPosition.length && value.presiding.length);

    this.form.valueChanges.pipe(takeUntil(this.$onDestroy)).subscribe(() => {
      const value = this.form.value;
      const orderPaperId = this.form.get('orderPaperId').value;

      this.valid =
        !!orderPaperId &&
        !!orderPaperId.length &&
        !!(value.presidingPosition.length && value.presiding.length);
    });
  }

  ngOnDestroy() {
    this.$onDestroy.next();
  }

  get orderPaperNo(): string {
    return `${this.form.get('orderPapersNo').value}`;
  }

  get presidingPosition():
    | 'Speaker of the Assembly'
    | 'Member of the Speaker Parliament' {
    return this.form.get('presidingPosition').value;
  }

  get memberName(): string {
    return this.form.get('presiding').value as string;
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<Cache, T>,
    additionalData?: Record<string, any> & { orderPaperContent?: string[] },
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<Cache, T>({
      id: 'GENERATE_VOTEBOOK',
      cacheId: this._cacheId,
      urlParamer: this._votebookId,
      returnUrl: '/generate/votebook/',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: { form: this.form, ...additionalData } as any,
      callback,
      configs,
    })();
  }

  onSelectOrderPaper() {
    this._onCache<OrderPaper>(
      { url: 'list/order-paper' },
      ({ form }, orderPaper) => {
        const {
          assemblyNo,
          _id,
          orderPaperNo,
          pageNoToDate,
          sessionNo,
        } = orderPaper;

        form.patchValue({
          orderPaperId: _id,
          assemblyNo,
          orderPapersNo: orderPaperNo,
          pageNoToDate,
          sessionNo,
          votebookNo: orderPaperNo,
        });

        return { form };
      }
    );
  }

  onSelectMca() {
    this._onCache<McaEmployee>(
      { url: 'list/mca-employee' },
      ({ form }, { name, _id }) => {
        form.patchValue({
          presiding: name,
          presidingId: _id,
        });

        return { form };
      }
    );
  }

  onGenerate() {
    this.cacheService.cache<{ form: FormGroup }, void>('GENERATE_VOTEBOOK', {
      form: this.form,
    });

    if (this._votebookId) {
      this.router.navigate(['/generate/votebook-content/' + this._votebookId]);
    } else {
      this.router.navigate(['/generate/votebook-content/']);
    }
  }
}
