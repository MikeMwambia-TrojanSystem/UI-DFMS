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
 * Resolve subcounty Data from url params
 *
 * @Example /generate/subcounty/60224665fd0c8e1b11fa85d5 -> Resolve subcounty data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class subcountyResolver implements Resolve<SubCounty> {
  constructor(private subcountyService: WardConSubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const subcountyId = route.paramMap.get('id');

    return this.subcountyService.getSubCounty(subcountyId).pipe(take(1));
  }
}
