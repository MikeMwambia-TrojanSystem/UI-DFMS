import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { OrderPaper } from '../../types/order-paper';

@Injectable({
  providedIn: 'root',
})
export class ListOrderPaperResolver implements Resolve<OrderPaper[]> {
  constructor(private orderPaperService: OrderPaperService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): OrderPaper[] | Promise<OrderPaper[]> | Observable<OrderPaper[]> {
    const publishState = route.queryParams.state || 'public';

    return this.orderPaperService.getOrderPapers().pipe(
      take(1),
      map((orderPapers) =>
        orderPapers.filter((o) => o.publishState === publishState)
      )
    );
  }
}
