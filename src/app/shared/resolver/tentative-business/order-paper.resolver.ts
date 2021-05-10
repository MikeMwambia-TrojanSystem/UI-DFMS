import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { OrderPaper } from '../../types/order-paper';

@Injectable({
  providedIn: 'root',
})
export class TentativeBusinessOrderPaperResolver
  implements Resolve<OrderPaper> {
  constructor(private orderPaperService: OrderPaperService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Promise<OrderPaper> | Observable<OrderPaper> | OrderPaper {
    const orderPaperId = route.queryParams['order-paper'];

    if (orderPaperId) {
      return this.orderPaperService.getOrderPaper(orderPaperId).pipe(take(1));
    }

    return undefined;
  }
}
