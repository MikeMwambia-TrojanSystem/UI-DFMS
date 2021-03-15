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
  selector: 'app-order-paper-generate',
  templateUrl: './order-paper-generate.component.html',
  styleUrls: ['./order-paper-generate.component.scss'],
})
export class OrderPaperGenerateComponent implements OnInit {
  private _orderPaperId: string;

  form = this.fb.group({
    orderPaperSignature: [''],
    assemblyId: ['1234'],
    datePublished: [''],
    publishState: ['draft'],
    published: [false],
    approvingAccount: ['test', Validators.required],
    approverId: ['12345', Validators.required],
    assemblyNo: ['', Validators.required],
    sessionNo: ['', Validators.required],
    orderPaperNo: ['', Validators.required],
    pageNoToDate: ['', Validators.required],
    adminContent: [''],
    communContent: [''],
    messages: [''],
    petitionId: [''],
    reportId: [''],
    statementId: [''],
    motionId: [''],
    motionNoticeId: [''],
    billsId: [''],
    adjournment: [''],
  });

  constructor(
    private fb: FormBuilder,
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
        if (orderPaper) {
          this._orderPaperId = orderPaper._id;

          const {
            adminstrationOfOath,
            approvingAccount,
            bills,
            communicationFromChainr,
            messages,
            motions,
            noticeOfMotions,
            papers,
            petitions,
            statements,
            ...others
          } = orderPaper;

          this.form.patchValue({
            ...others,
            approvingAccount: approvingAccount.account,
            approverId: approvingAccount.approverId,
            adminContent: adminstrationOfOath.join('&&&'),
            communContent: communicationFromChainr.join('&&&'),
            messages: messages
              .map(
                ({ content, source, uploadedLocation }) =>
                  `content=${content}|||source=${source}|||uploadedLocation=${uploadedLocation}`
              )
              .join('&&&'),
            petitionId: petitions.join('&&&'),
            reportId: papers.join('&&&'),
            statementId: statements.join('&&&'),
            motionId: motions.join('&&&'),
            motionNoticeId: noticeOfMotions.join('&&&'),
            billsId: bills.join('&&&'),
          });
        }
      });

    const cachedData = this.cacheService.rehydrate<OrderPaperCached>(
      'GENERATE_ORDER_PAPER'
    );

    if (cachedData) {
      this.form.patchValue({
        ...cachedData.form.value,
      });
    }
  }

  onGenerate() {
    this.cacheService.cache<OrderPaperCached, void>('GENERATE_ORDER_PAPER', {
      form: this.form,
    });

    if (this._orderPaperId) {
      this.router.navigate(['/generate/paper-content/' + this._orderPaperId]);
    } else {
      this.router.navigate(['/generate/paper-content/']);
    }
  }
}
