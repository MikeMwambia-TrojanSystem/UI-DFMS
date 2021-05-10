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
export class CanActivateTentativeBusinessOrderPaper implements CanActivate {
  constructor(
    private orderPaperService: OrderPaperService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {
    const orderPaperId = route.queryParams['order-paper'];

    if (orderPaperId) {
      return this.orderPaperService.getOrderPaper(orderPaperId).pipe(
        take(1),
        map((paper) => (paper ? true : this.router.createUrlTree(['/intro'])))
      );
    } else {
      return true;
    }
  }
}
