import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActService } from 'src/app/services/act.service';
import { Act } from 'src/app/shared/types/act';

/**
 * Resolve Act Data from url params
 *
 * @Example /generate/act/60224665fd0c8e1b11fa85d5 -> Resolve act data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class ActResolver implements Resolve<Act> {
  constructor(private actService: ActService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Act> | Promise<Act> | Act {
    const actId = route.paramMap.get('id');

    return this.actService.getAct(actId).pipe(take(1));
  }
}
