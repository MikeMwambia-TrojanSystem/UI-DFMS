import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { Ward } from 'src/app/shared/types/ward-con-sub';

/**
 * Resolve all Ward data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListWardResolver implements Resolve<Ward[]> {
  constructor(private wardConSubService: WardConSubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ward[]> | Promise<Ward[]> | Ward[] {
    const publishState = route.queryParams.state !== 'draft';

    return this.wardConSubService.getWards().pipe(
      take(1),
      map((wards) => wards.filter((w) => w.published === publishState))
    );
  }
}
