import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import moment from 'moment';

import { CacheService } from 'src/app/services/cache.service';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { TentativeBusiness } from 'src/app/shared/types/tentative-business';

export interface OrderPaperCached {
  form: FormGroup;
  page?: number;
  title?: string;
}

const CACHE_ID = 'GENERATE_TENTATIVE_BUSINESS';

@Component({
  templateUrl: './tentative-biz-generate.component.html',
  styleUrls: ['./tentative-biz-generate.component.scss'],
})
export class TentativeBusinessGenerateComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject();
  private _tentativeBizId: string;
  hasOrderPaperIdQuery: boolean;
  picker: string;

  form = this.fb.group({
    orderPaperNo: [],
    orderPaperId: ['', Validators.required],
    dateOfContent: ['', Validators.required],
    dayOfContent: ['', Validators.required],
    timeOfContent: ['', Validators.required],
    assemblySitting: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Get Order paper id from url query
    const orderPaperId = this.route.snapshot.queryParamMap.get('order-paper');
    this.hasOrderPaperIdQuery = !!orderPaperId;

    // Get resolved data
    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          orderPaper,
          tentativeBusiness,
        }: {
          orderPaper: OrderPaper;
          tentativeBusiness: TentativeBusiness;
        }) => {
          if (orderPaper) {
            this.form.patchValue({
              orderPaperNo: orderPaper.orderPaperNo,
              orderPaperId: orderPaper._id,
            });
          }


          if (tentativeBusiness) {
            const {
              orderPaperId,
              dateOfContent,
              dayOfContent,
              timeOfContent,
              assemblySitting,
            } = tentativeBusiness;

            this.form.patchValue({
              orderPaperId,
              dateOfContent,
              dayOfContent,
              assemblySitting,
            });

            const timeFormatted = moment(timeOfContent).format('HH:mm');

            if (timeFormatted === 'Invalid date') {
              alert('Please re-enter exact sitting time');
            } else {
              this.form.patchValue({
                timeOfContent: timeFormatted,
              });
            }

            this._tentativeBizId = tentativeBusiness._id;
            this.hasOrderPaperIdQuery = true;
          }
        }
      );

    // get cached data
    const cached = this.cacheService.rehydrate<{ form: FormGroup }>(CACHE_ID);

    if (cached && cached.form) {
      this.form.patchValue({
        ...cached.form.value,
      });
    }

    this.form
      .get('dateOfContent')
      .valueChanges.pipe(takeUntil(this.$onDestroy))
      .subscribe((v) => {
        this.form.get('dayOfContent').setValue(moment(v).format('dddd'));
      });
  }

  get orderPaperNo(): number {
    return this.form.get('orderPaperNo').value;
  }

  get orderPaperId(): string {
    return this.form.get('orderPaperId').value;
  }

  ngOnDestroy() {
    this.$onDestroy.next();
  }

  onGenerate() {
    this.cacheService.cache<{ form: FormGroup }, void>(CACHE_ID, {
      form: this.form,
    });

    if (this._tentativeBizId) {
      this.router.navigate([
        '/generate/tentative-business-content/' + this._tentativeBizId,
      ]);
    } else {
      this.router.navigate(['/generate/tentative-business-content'], {
        queryParams: {
          'order-paper': this.orderPaperId,
        },
      });
    }
  }

  onNotNow() {
    this.router.navigate(['/', 'list', 'order-paper'], {
      queryParams: {
        state: this.route.snapshot.queryParams.state || 'public',
      },
    });
  }

  onSelectOrderPaper() {
    this.cacheService.cache<{ form: FormGroup }, OrderPaper>(
      CACHE_ID,
      { form: this.form },
      this.router.createUrlTree(['/', 'generate', 'tentative-business']),
      ({ form }, { _id, orderPaperNo }) => {
        form.patchValue({
          orderPaperNo,
          orderPaperId: _id,
        });

        return {
          form,
        };
      }
    );

    this.router.navigate(['/', 'list', 'order-paper'], {
      queryParams: {
        select: true,
        id: CACHE_ID,
      },
    });
  }
}
