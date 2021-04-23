import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { OrderPaper } from 'src/app/shared/types/order-paper';

@Component({
  styleUrls: ['./list-order-paper.component.scss'],
  templateUrl: './list-order-paper.component.html',
})
export class ListOrderPaperComponent implements OnInit {
  private _cacheId: string;
  private _orderPapers: OrderPaper[];
  orderPapers: OrderPaper[];

  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private orderPaperService: OrderPaperService,
    private router: Router,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select || false;
    this._cacheId = queryParams.id;

    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPapers }: { orderPapers: OrderPaper[] }) => {
        const ordered = _.orderBy(orderPapers, 'datePublished', 'desc');
        this._orderPapers = ordered;
        this.orderPapers = ordered;
      });
  }

  onSelect(orderPaper: OrderPaper) {
    this.cacheService.emit(this._cacheId, orderPaper);
  }

  onCreateNew() {
    this.router.navigate(['/generate/order-paper']);
  }

  onDelete(orderPaper: OrderPaper) {
    this.orderPaperService.deleteOrderPaper(orderPaper._id).subscribe(() => {
      window.location.reload();
    });
  }

  onApprove({
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
    _id,
    ...others
  }: OrderPaper) {
    this.orderPaperService
      .updateOrderPaper({
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
        published: true,
        id: _id,
      } as any)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.orderPapers = this._orderPapers.filter(
      (i) => i.orderPaperNo.toString() === query
    );
  }
}
