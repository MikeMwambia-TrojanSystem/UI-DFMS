import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { SubCounty } from 'src/app/shared/types/ward-con-sub';

/**
 * Resolve all SubCounty data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListSubCountyResolver implements Resolve<SubCounty[]> {
  constructor(private wardConSubService: WardConSubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SubCounty[]> | Promise<SubCounty[]> | SubCounty[] {
    return this.wardConSubService.getSubCounties().pipe(take(1));
  }
}
