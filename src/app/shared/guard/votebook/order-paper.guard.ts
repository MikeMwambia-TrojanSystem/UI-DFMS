import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateVotebookOrderPaper implements CanActivate {
  constructor(
    private orderPaperService: OrderPaperService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    const orderPaperId = route.params.orderPaperId;

    return this.orderPaperService.getOrderPaper(orderPaperId).pipe(
      take(1),
      map((orderPaper) =>
        orderPaper ? true : this.router.createUrlTree(['/'])
      )
    );
  }
}
