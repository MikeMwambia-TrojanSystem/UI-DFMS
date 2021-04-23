import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  MenuItem,
  MenuNotification,
} from 'src/app/components/MenuContainer/menu-container.component';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { take } from 'rxjs/operators';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { TentativeBusiness } from 'src/app/shared/types/tentative-business';

@Component({
  templateUrl: './tb-content-view.component.html',
  styleUrls: ['./tb-content-view.component.scss'],
})
export class TentativeBusinessContentViewComponent implements OnInit {
  items: MenuItem[] = [
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
    orderPaperId: [{ value: '', disabled: true }],
    time: [{ value: '', disabled: true }],
    dayOfContent: [{ value: '', disabled: true }],
    dateOfContent: [{ value: '', disabled: true }],
    petitionId: [{ value: '', disabled: true }],
    reportId: [{ value: '', disabled: true }],
    motionNoticeId: [{ value: '', disabled: true }],
    statementId: [{ value: '', disabled: true }],
    motionId: [{ value: '', disabled: true }],
    billsId: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    publishState: [{ value: '', disabled: true }],
  });

  orderPaper: OrderPaper;
  authorName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tentativeBusinessService: TentativeBusinessService
  ) {}

  ngOnInit(): void {
    // Populate content
    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          tentativeBusiness,
          orderPaper,
        }: {
          tentativeBusiness: TentativeBusiness;
          orderPaper: OrderPaper;
        }) => {
          const {
            bills,
            motions,
            noticeOfMotions,
            papers,
            petitions,
            statements,
          } = tentativeBusiness;

          this.orderPaper = orderPaper;
          this.authorName = tentativeBusiness.authorName;

          this.form.patchValue({
            petitionId: this.tentativeBusinessService.checkNone(petitions),
            reportId: this.tentativeBusinessService.checkNone(papers),
            motionNoticeId: this.tentativeBusinessService.checkNone(
              noticeOfMotions
            ),
            statementId: this.tentativeBusinessService.checkNone(statements),
            motionId: this.tentativeBusinessService.checkNone(motions),
            billsId: this.tentativeBusinessService.checkNone(bills),
          });
        }
      );

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
}
