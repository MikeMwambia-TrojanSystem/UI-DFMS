import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CacheService } from 'src/app/services/cache.service';
import { OrderPaperService } from 'src/app/services/order-paper.service';
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
    approvingAccount: [''],
    approverId: [''],
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
    adjournment: ['ADJOURNMENT'],
    assemblySittingDate: ['', Validators.required],
    assemblySittingTime: ['', Validators.required],
    assemblySittingPeriod: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private orderPaperService: OrderPaperService
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
            adminContent: this.orderPaperService.checkNone(adminstrationOfOath),
            communContent: this.orderPaperService.checkNone(
              communicationFromChainr
            ),
            messages: this.orderPaperService.checkNone(messages, (m) =>
              m
                .map(
                  (m) =>
                    `content=${m.content}|||source=${m.source}|||uploadedLocation=${m.uploadedLocation}`
                )
                .join('&&&')
            ),
            petitionId: this.orderPaperService.checkNone(petitions),
            reportId: this.orderPaperService.checkNone(papers),
            statementId: this.orderPaperService.checkNone(statements),
            motionId: this.orderPaperService.checkNone(motions),
            motionNoticeId: this.orderPaperService.checkNone(noticeOfMotions),
            billsId: this.orderPaperService.checkNone(bills),
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
