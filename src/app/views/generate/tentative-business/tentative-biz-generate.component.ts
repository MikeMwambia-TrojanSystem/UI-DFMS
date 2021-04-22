import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { OrderPaper } from 'src/app/shared/types/order-paper';

export interface OrderPaperCached {
  form: FormGroup;
  page?: number;
  title?: string;
}

@Component({
  templateUrl: './tentative-biz-generate.component.html',
  styleUrls: ['./tentative-biz-generate.component.scss'],
})
export class TentativeBusinessGenerateComponent implements OnInit {
  private _tentativeBizId: string;
  orderPaper: OrderPaper;

  form = this.fb.group({
    orderPaperId: ['', Validators.required],
    dateOfContent: ['', Validators.required],
    dayOfContent: ['', Validators.required],
    time: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
        this.orderPaper = orderPaper;
      });
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
}
