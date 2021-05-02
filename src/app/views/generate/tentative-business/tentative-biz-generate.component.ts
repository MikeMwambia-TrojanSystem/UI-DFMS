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

@Component({
  templateUrl: './tentative-biz-generate.component.html',
  styleUrls: ['./tentative-biz-generate.component.scss'],
})
export class TentativeBusinessGenerateComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject();
  private _tentativeBizId: string;
  orderPaper: OrderPaper;

  form = this.fb.group({
    orderPaperId: ['', Validators.required],
    dateOfContent: ['', Validators.required],
    dayOfContent: ['', Validators.required],
    time: ['', Validators.required],
    assemblySitting: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
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
          this.orderPaper = orderPaper;
          this.form.get('orderPaperId').setValue(orderPaper._id);

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
              time: timeOfContent,
            });

            this._tentativeBizId = tentativeBusiness._id;
          }
        }
      );

    this.form
      .get('dateOfContent')
      .valueChanges.pipe(takeUntil(this.$onDestroy))
      .subscribe((v) => {
        this.form.get('dayOfContent').setValue(moment(v).format('dddd'));
      });
  }

  ngOnDestroy() {
    this.$onDestroy.next();
  }

  onGenerate() {
    this.cacheService.cache<{ form: FormGroup }, void>(
      'GENERATE_TENTATIVE_BUSINESS',
      {
        form: this.form,
      }
    );

    if (this._tentativeBizId) {
      this.router.navigate([
        '/generate/tentative-business-content/' + this._tentativeBizId,
      ]);
    } else {
      this.router.navigate(['/generate/tentative-business-content'], {
        queryParams: {
          'order-paper': this.orderPaper._id,
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
}
