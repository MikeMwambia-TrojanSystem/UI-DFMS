import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import {
  TentativeBusiness,
  TentativeBusinessWithOrderNumber,
} from 'src/app/shared/types/tentative-business';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { OrderPaperService } from 'src/app/services/order-paper.service';

@Component({
  templateUrl: './list-tentative-business.component.html',
  styleUrls: ['./list-tentative-business.component.scss'],
})
export class ListTentativeBusinesssComponent implements OnInit {
  private _cacheId: string;
  private _tentativeBusinesses: TentativeBusiness[];
  tentativeBusinesses: TentativeBusiness[];

  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private tentativeBusinessService: TentativeBusinessService,
    private cacheService: CacheService,
    private orderPaperService: OrderPaperService
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select || false;
    this._cacheId = queryParams.id;

    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          tentativeBusinesses,
        }: {
          tentativeBusinesses: TentativeBusinessWithOrderNumber[];
        }) => {
          const ordered = _.orderBy(tentativeBusinesses, 'createdAt', 'desc');
          this._tentativeBusinesses = ordered;
          this.tentativeBusinesses = ordered;
        }
      );
  }

  onSelect(tentativeBusinesses: TentativeBusiness) {
    this.cacheService.emit(this._cacheId, tentativeBusinesses);
  }

  onDelete(tentativeBusinesses: TentativeBusiness) {
    this.tentativeBusinessService
      .deleteTentativeBusiness(tentativeBusinesses._id)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onApprove({
    timeOfContent,
    bills,
    motions,
    noticeOfMotions,
    papers,
    petitions,
    statements,
    _id,
    ...others
  }: TentativeBusiness) {
    this.tentativeBusinessService
      .updateTentativeBusiness({
        ...others,
        time: timeOfContent,
        petitionId: this.tentativeBusinessService.checkNone(petitions),
        reportId: this.tentativeBusinessService.checkNone(papers),
        motionNoticeId: this.tentativeBusinessService.checkNone(
          noticeOfMotions
        ),
        statementId: this.tentativeBusinessService.checkNone(statements),
        motionId: this.tentativeBusinessService.checkNone(motions),
        billsId: this.tentativeBusinessService.checkNone(bills),
        published: true,
        id: _id,
      } as any)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    const orderPaperNo = _.toInteger(query);

    if (!orderPaperNo) {
      this.tentativeBusinesses = this._tentativeBusinesses;
    } else {
      this.orderPaperService
        .getOrderPapers()
        .pipe(
          take(1),
          map((orderPapers) =>
            orderPapers
              .filter((o) => o.orderPaperNo.toString().includes(query))
              .map((o) => o._id)
          )
        )
        .subscribe(
          (orderPaperIds) =>
            (this.tentativeBusinesses = this._tentativeBusinesses.filter((t) =>
              orderPaperIds.includes(t.orderPaperId)
            ))
        );
    }
  }
}
