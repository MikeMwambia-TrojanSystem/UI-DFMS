import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { OrderPaper } from '../../types/order-paper';

@Injectable({
  providedIn: 'root',
})
export class TentativeBusinessOrderPaperEditResolver
  implements Resolve<OrderPaper> {
  constructor(
    private orderPaperService: OrderPaperService,
    private tentativeBusinessService: TentativeBusinessService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Promise<OrderPaper> | Observable<OrderPaper> | OrderPaper {
    const tentativeBusinessId = route.params.id;

    return this.tentativeBusinessService
      .getTentativeBusiness(tentativeBusinessId)
      .pipe(
        take(1),
        switchMap((tentativeBusiness) =>
          this.orderPaperService
            .getOrderPaper(tentativeBusiness.orderPaperId)
            .pipe(take(1))
        )
      );
  }
}
