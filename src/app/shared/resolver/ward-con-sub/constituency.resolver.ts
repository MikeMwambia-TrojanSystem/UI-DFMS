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
 * Resolve constituency Data from url params
 *
 * @Example /generate/constituency/60224665fd0c8e1b11fa85d5 -> Resolve constituency data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class ConstituencyResolver implements Resolve<Constituency> {
  constructor(private constituencyService: WardConSubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const constituencyId = route.paramMap.get('id');

    return this.constituencyService
      .getConstituency(constituencyId)
      .pipe(take(1));
  }
}
