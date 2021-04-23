import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { OrderPaper } from 'src/app/shared/types/order-paper';
import { TentativeBusiness } from 'src/app/shared/types/tentative-business';

@Component({
  templateUrl: './tentative-biz-view.component.html',
  styleUrls: ['./tentative-biz-view.component.scss'],
})
export class TentativeBusinessViewComponent implements OnInit {
  form = this.fb.group({
    orderPaperId: [{ value: '', disabled: true }],
    dateOfContent: [{ value: '', disabled: true }],
    dayOfContent: [{ value: '', disabled: true }],
    time: [{ value: '', disabled: true }],
  });

  tentativeBizId: string;
  orderPaperNo: number;
  authorName: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

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
          this.orderPaperNo = orderPaper.orderPaperNo;

          const {
            orderPaperId,
            dateOfContent,
            dayOfContent,
            timeOfContent,
          } = tentativeBusiness;

          this.form.patchValue({
            orderPaperId,
            dateOfContent,
            dayOfContent,
            time: timeOfContent,
          });

          this.tentativeBizId = tentativeBusiness._id;
        }
      );
  }
}
