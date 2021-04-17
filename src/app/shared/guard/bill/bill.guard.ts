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
import { BillService } from 'src/app/services/bill.service';

/**
 * Prevent accessing not found bill ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateBill implements CanActivate {
  constructor(private billService: BillService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const billId = route.params.id;

    return this.billService.getBill(billId).pipe(
      take(1),
      map((bill) => {
        if (bill) {
          return true;
        }

        return this.router.createUrlTree(['/generate/bill']);
      })
    );
  }
}
