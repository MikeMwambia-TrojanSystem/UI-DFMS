import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/shared/types/bill';

/**
 * Resolve Bill Data from url params
 *
 * @Example /generate/bill/60224665fd0c8e1b11fa85d5 -> Resolve bill data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class BillResolver implements Resolve<Bill> {
  constructor(private billService: BillService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const billId = route.paramMap.get('id');

    return this.billService.getBill(billId).pipe(take(1));
  }
}
