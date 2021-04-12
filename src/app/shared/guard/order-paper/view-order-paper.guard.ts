import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';

/**
 * Prevent accessing not found order paper ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateViewOrderPaper implements CanActivate {
  constructor(
    private orderPaperService: OrderPaperService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id = route.params.id;

    return this.orderPaperService.getOrderPaper(id).pipe(
      take(1),
      map((orderPaper) => {
        if (orderPaper) {
          return true;
        }

        return this.router.createUrlTree(['/generate/order-paper']);
      })
    );
  }
}
