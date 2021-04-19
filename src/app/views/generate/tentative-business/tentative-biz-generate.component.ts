import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

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
  orderPaperNo: number;

  form = this.fb.group({
    assemblySittingDate: ['', Validators.required],
    assemblySittingTime: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.orderPaperNo = this.route.snapshot.queryParams['order-paper'];

    if (!this.orderPaperNo) {
      this.router.navigate(['/intro']);
    }
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
          'order-paper': this.orderPaperNo,
        },
      });
    }
  }
}
