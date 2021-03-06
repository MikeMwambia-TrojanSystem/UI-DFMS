import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CommitteeService } from 'src/app/services/committee.service';

/**
 * Prevent accessing not found committee ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateCommittee implements CanActivate {
  constructor(
    private committeeService: CommitteeService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const committeeId = route.params.id;

    return this.committeeService.getCommittee(committeeId).pipe(
      take(1),
      map((committee) => {
        if (committee && !committee.published) {
          return true;
        }

        return this.router.createUrlTree(['/create/committee']);
      })
    );
  }
}
