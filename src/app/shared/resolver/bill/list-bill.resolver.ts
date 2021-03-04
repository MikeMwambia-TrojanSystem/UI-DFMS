import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from '../../types/bill';

/**
 * Resolve all Bill data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListBillResolver implements Resolve<Bill[]> {
  constructor(private billService: BillService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> | Promise<any[]> | any[] {
    const publishState = route.queryParams.state || 'public';

    return this.billService.getBills().pipe(
      take(1),
      map((bills) =>
        bills.filter((b) => b.publishState === publishState)
      )
    );
  }
}
