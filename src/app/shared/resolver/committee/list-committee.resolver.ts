import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
    const queryState = route.queryParams.state;
    const published = queryState ? queryState === 'published' : true;

    return this.commiteeService.fetchCommittees().pipe(
      take(1),
      map((committees) =>
        committees.filter((committee) => committee.published === published)
      )
    );
  }
}
