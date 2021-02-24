import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { Ward } from 'src/app/shared/types/ward-con-sub';

/**
 * Resolve ward Data from url params
 *
 * @Example /generate/ward/60224665fd0c8e1b11fa85d5 -> Resolve ward data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class WardResolver implements Resolve<Ward> {
  constructor(private wardService: WardConSubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const wardId = route.paramMap.get('id');

    return this.wardService.getWard(wardId).pipe(take(1));
  }
}
