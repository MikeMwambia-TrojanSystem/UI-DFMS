import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { TentativeBusinessWithOrderNumber } from '../../types/tentative-business';

@Injectable({
  providedIn: 'root',
})
export class ListTentativeBusinessResolver
  implements Resolve<TentativeBusinessWithOrderNumber[]> {
  constructor(
    private tentativeBusinessService: TentativeBusinessService,
    private orderPaperService: OrderPaperService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ):
    | Promise<TentativeBusinessWithOrderNumber[]>
    | Observable<TentativeBusinessWithOrderNumber[]>
    | TentativeBusinessWithOrderNumber[] {
    const publishState = route.queryParams.state || 'public';

    return this.tentativeBusinessService.fetchTentativeBusinesses().pipe(
      take(1),
      switchMap((tentativeBusinesses) =>
        this.orderPaperService.fetchOrderPapers().pipe(
          take(1),
          map((orderPapers) => {
            return tentativeBusinesses
              .map<TentativeBusinessWithOrderNumber>((t) => ({
                ...t,
                orderPaperNo: orderPapers.find((o) => o._id === t.orderPaperId)
                  .orderPaperNo,
              }))
              .filter((t) => t.publishState === publishState);
          })
        )
      )
    );
  }
}
