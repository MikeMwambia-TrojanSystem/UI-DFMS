import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { Constituency } from 'src/app/shared/types/ward-con-sub';

/**
 * Resolve all Constituency data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListConstituencyResolver implements Resolve<Constituency[]> {
  constructor(private wardConSubService: WardConSubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Constituency[]> | Promise<Constituency[]> | Constituency[] {
    return this.wardConSubService.getConstituencies().pipe(take(1));
  }
}
