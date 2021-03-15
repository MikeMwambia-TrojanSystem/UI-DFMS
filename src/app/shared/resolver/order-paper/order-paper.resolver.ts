import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { OrderPaper } from '../../types/order-paper';

@Injectable({
  providedIn: 'root',
})
export class OrderPaperResolver implements Resolve<OrderPaper> {
  constructor(private orderPaperService: OrderPaperService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): OrderPaper | Promise<OrderPaper> | Observable<OrderPaper> {
    const orderPaperId = route.params.id;

    return this.orderPaperService.getOrderPaper(orderPaperId).pipe(take(1));
  }
}
