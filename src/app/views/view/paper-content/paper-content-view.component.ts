import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { take } from 'rxjs/operators';
import moment from 'moment';

import {
  MenuItem,
  MenuNotification,
} from 'src/app/components/MenuContainer/menu-container.component';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { OrderPaper } from 'src/app/shared/types/order-paper';

@Component({
  templateUrl: './paper-content-view.component.html',
  styleUrls: ['./paper-content-view.component.scss'],
})
export class PaperContentViewComponent implements OnInit {
  items: MenuItem[] = [
    {
      key: 'adminContent',
      label: 'Administration of Oath',
      generate: 'adminContent',
    },
    {
      key: 'communContent',
      label: 'Communication from Chair',
      generate: 'communContent',
    },
    {
      key: 'messages',
      label: 'Messages',
      generate: 'messages',
    },
    {
      key: 'petitionId',
      label: 'Petitions',
      select: 'petitionId',
    },
    {
      key: 'reportId',
      label: 'Papers',
      select: 'reportId',
    },
    {
      key: 'motionNoticeId',
      label: 'Notice of Motions',
      select: 'motionNoticeId',
    },
    {
      key: 'statementId',
      label: 'Statements',
      select: 'statementId',
    },
    {
      key: 'motionId',
      label: 'Motions',
      select: 'motionId',
    },
    {
      key: 'billsId',
      label: 'Bills',
      select: 'billsId',
    },
  ];

  form = this.fb.group({
    orderPaperSignature: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    publishState: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
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
  });

  authorName: string;
  paperId: string;
  approver: string;
  approvedAt: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderPaperService: OrderPaperService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
        const {
          approvingAccount,
          messages,
          adminstrationOfOath,
          communicationFromChainr,
          petitions,
          papers,
          statements,
          motions,
          noticeOfMotions,
          bills,
          authorName,
          approver,
          updatedAt,
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

        this.authorName = authorName;
        this.paperId = orderPaper._id;
        this.approver = approver;
        this.approvedAt = moment(updatedAt).format('Do MMMM YYYY');
      });

    this._populateNotifications();
  }

  private _populateNotifications() {
    for (const item of this.items) {
      const value = this.form.get(item.key).value as string;
      let result: MenuNotification[] = [];

      if (value !== 'NONE') {
        let contents = value.split('&&&');
        contents = contents[0].length ? contents : [];

        result = contents.reduce((result, currentContent) => {
          if (currentContent.length) {
            return [
              ...result,
              {
                key: currentContent,
                type: item.key,
                content: currentContent,
              },
            ];
          }
          return result;
        }, []);
      }

      item.notifications = result;
    }
  }

  getNoContent(
    type: 'adminContent' | 'communContent' | 'messages' | 'adjournment'
  ): string {
    const value = this.form.get(type).value as string;
    let contents = value.split('&&&');

    contents = contents[0].length ? contents : [];

    return contents.length.toString();
  }
}
