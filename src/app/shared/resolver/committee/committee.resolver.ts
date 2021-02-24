import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CommitteeService } from 'src/app/services/committee.service';
import { Committee } from 'src/app/shared/types/committee';

/**
 * Resolve Committee Data from url params
 *
 * @Example /generate/committee/60224665fd0c8e1b11fa85d5 -> Resolve committee data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class CommitteeResolver implements Resolve<Committee> {
  constructor(private committeeService: CommitteeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const committeeId = route.paramMap.get('id');

    return this.committeeService.getCommittee(committeeId).pipe(take(1));
  }
}
