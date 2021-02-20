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
 * Resolve all Committee data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListCommitteeResolver implements Resolve<Committee[]> {
  constructor(private commiteeService: CommitteeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Committee[]> | Promise<Committee[]> | Committee[] {
    return this.commiteeService.getCommittees().pipe(take(1));
  }
}
