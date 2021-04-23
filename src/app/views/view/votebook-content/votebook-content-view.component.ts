import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { take } from 'rxjs/operators';
import {
  MenuItem,
  MenuNotification,
} from 'src/app/components/MenuContainer/menu-container.component';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { Votebook } from 'src/app/shared/types/votebook';

type Generate =
  | 'adminstrationOfOathReply'
  | 'communicationFromChainr'
  | 'messageContent'
  | 'petionReply'
  | 'reportReply'
  | 'noticeOfMotionsReply'
  | 'statementReply'
  | 'motions'
  | 'bills'
  | 'adjournment';

@Component({
  templateUrl: './votebook-content-view.component.html',
  styleUrls: ['./votebook-content-view.component.scss'],
})
export class VotebookContentViewComponent implements OnInit {
  items: MenuItem[] = [
    {
      key: 'adminstrationOfOathReply',
      label: 'Administration of Oath',
      generate: 'adminstrationOfOathReply',
    },
    {
      key: 'communicationFromChainr',
      label: 'Communication from Chair',
      generate: 'communicationFromChainr',
    },
    {
      key: 'messageContent',
      label: 'Messages',
      generate: 'messageContent',
    },
    {
      key: 'petionReply',
      label: 'Petitions',
      generate: 'petionReply',
    },
    {
      key: 'reportReply',
      label: 'Papers',
      generate: 'reportReply',
    },
    {
      key: 'noticeOfMotionsReply',
      label: 'Notice of Motions',
      generate: 'noticeOfMotionsReply',
    },
    {
      key: 'statementReply',
      label: 'Statements',
      generate: 'statementReply',
    },
    {
      key: 'motions',
      label: 'Motions',
      generate: 'motions',
    },
    {
      key: 'bills',
      label: 'Bills',
      generate: 'bills',
    },
    {
      key: 'adjournment',
      label: 'Adjournment',
      generate: 'adjournment',
    },
  ];

  form = this.fb.group({
    datePublished: [{ value: '', disabled: true }],
    approvingAccount: [{ value: '', disabled: true }],
    approverId: [{ value: '', disabled: true }],
    presidingPosition: [{ value: '', disabled: true }],
    published: [{ value: '', disabled: true }],
    publishState: [{ value: '', disabled: true }],
    voteBookSignature: [{ value: '', disabled: true }],
    orderPaperId: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    assemblyNo: [{ value: '', disabled: true }],
    orderPapersNo: [{ value: '', disabled: true }],
    pageNoToDate: [{ value: '', disabled: true }],
    sessionNo: [{ value: '', disabled: true }],
    votebookNo: [{ value: '', disabled: true }],
    adminstrationOfOathReply: [{ value: '', disabled: true }],
    communicationFromChainr: [{ value: '', disabled: true }],
    messageContent: [{ value: '', disabled: true }],
    petionReply: [{ value: '', disabled: true }],
    reportReply: [{ value: '', disabled: true }],
    noticeOfMotionsReply: [{ value: '', disabled: true }],
    statementReply: [{ value: '', disabled: true }],
    motions: [{ value: '', disabled: true }],
    bills: [{ value: '', disabled: true }],
    adjournment: [{ value: '', disabled: true }],
    presiding: [{ value: '', disabled: true }],
    presidingId: [{ value: '', disabled: true }],
  });

  authorName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderPaperService: OrderPaperService
  ) {}

  ngOnInit(): void {
    // Get resolved order paper data
    this.route.data
      .pipe(take(1))
      .subscribe(({ votebook }: { votebook: Votebook }) => {
        const {
          adminstrationOfOath,
          bills,
          communicationFromChainr,
          messages,
          motions,
          noticeOfMotions,
          papers,
          petitions,
          statements,
          approvingAccount,
          presiding,
          ...others
        } = votebook;

        this.form.patchValue({
          ...others,
          approvingAccount: approvingAccount.account,
          approverId: approvingAccount.approverId,
          adminstrationOfOathReply: adminstrationOfOath.join('&&&'),
          communicationFromChainr: communicationFromChainr.join('&&&'),
          messageContent: messages.join('&&&'),
          petionReply: petitions.join('&&&'),
          reportReply: papers.join('&&&'),
          noticeOfMotionsReply: noticeOfMotions.join('&&&'),
          statementReply: statements.join('&&&'),
          motions: motions
            .filter((m) => m.content)
            .map(
              (m) =>
                `content=${m.content}|||source=${m.source}|||motionId=${m.documentId}`
            )
            .join('&&&'),
          bills: bills
            .filter((m) => m.content)
            .map(
              (m) =>
                `content=${m.content}|||source=${m.source}|||billId=${m.documentId}`
            )
            .join('&&&'),
        });

        this.authorName = votebook.authorName;
      });

    this.orderPaperService
      .getOrderPaper(this.form.get('orderPaperId').value)
      .pipe(take(1))
      .subscribe((orderPaper) => {
        const {
          adminstrationOfOath,
          messages,
          petitions,
          papers,
          noticeOfMotions,
          statements,
        } = orderPaper;
        const {
          adminstrationOfOathReply,
          communicationFromChainr,
          messageContent,
          petionReply,
          reportReply,
          noticeOfMotionsReply,
          statementReply,
          motions,
          bills,
        } = this.form.value;

        this.form.patchValue({
          adminstrationOfOathReply: adminstrationOfOath.length
            ? adminstrationOfOathReply
            : 'NONE',
          communicationFromChainr: orderPaper.communicationFromChainr.length
            ? communicationFromChainr
            : 'NONE',
          messageContent: messages.length ? messageContent : 'NONE',
          petionReply: petitions.length ? petionReply : 'NONE',
          reportReply: papers.length ? reportReply : 'NONE',
          noticeOfMotionsReply: noticeOfMotions.length
            ? noticeOfMotionsReply
            : 'NONE',
          statementReply: statements.length ? statementReply : 'NONE',
          motions: orderPaper.motions.length ? motions : 'NONE',
          bills: orderPaper.bills.length ? bills : 'NONE',
        });
      });

    this._populateNotifications();
  }

  get orderPaperNo(): string | number {
    return this.form.get('orderPapersNo').value;
  }

  getNoOfContent(type: Generate): number {
    const array = (this.form.get(type).value as string).split('&&&');
    return array[0].length ? array.length : 0;
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
}
