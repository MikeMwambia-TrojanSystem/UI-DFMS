import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { OrderPaper } from 'src/app/shared/types/order-paper';

@Component({
  templateUrl: './order-paper-document-view.component.html',
  styleUrls: ['./order-paper-document-view.component.scss'],
})
export class OrderPaperDocumentViewComponent implements OnInit {
  id: string;
  form = this.fb.group({
    orderPaperSignature: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    publishState: [{ value: '', disabled: true }],
    published: [false],
    approvingAccount: [{ value: '', disabled: true }],
    approverId: [{ value: '', disabled: true }],
    assemblyNo: [{ value: '', disabled: true }],
    sessionNo: [{ value: '', disabled: true }],
    orderPaperNo: [{ value: '', disabled: true }],
    pageNoToDate: [{ value: '', disabled: true }],
    adminContent: [{ value: '', disabled: true }],
    communContent: [{ value: '', disabled: true }],
    messages: [{ value: '', disabled: true }],
    petitionId: [{ value: '', disabled: true }],
    reportId: [{ value: '', disabled: true }],
    statementId: [{ value: '', disabled: true }],
    motionId: [{ value: '', disabled: true }],
    motionNoticeId: [{ value: '', disabled: true }],
    billsId: [{ value: '', disabled: true }],
    adjournment: [{ value: '', disabled: true }],
    assemblySittingDate: [{ value: '', disabled: true }],
    assemblySittingTime: [{ value: '', disabled: true }],
    assemblySittingPeriod: [{ value: '', disabled: true }],
  });

  authorName: string;
  approver: string;
  approvedAt: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
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
          authorName,
          _id,
          approver,
          updatedAt,
          ...others
        } = orderPaper;

        this.form.patchValue({
          ...others,
          approvingAccount: approvingAccount.account,
          approverId: approvingAccount.approverId,
        });

        this.id = _id;
        this.authorName = authorName;
        this.approver = approver;
        this.approvedAt = moment(updatedAt).format('Do MMMM YYYY');
      });
  }
}
