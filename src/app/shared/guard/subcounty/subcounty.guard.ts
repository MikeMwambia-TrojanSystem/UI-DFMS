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

import { WardConSubService } from 'src/app/services/ward-con-sub.service';

/**
 * Prevent accessing not found subcounty ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateSubcounty implements CanActivate {
  constructor(
    private subcountyService: WardConSubService,
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
    const subcountyId = route.params.id;

    return this.subcountyService.getSubCounty(subcountyId).pipe(
      take(1),
      map((subcounty) => {
        if (subcounty && !subcounty.published) {
          return true;
        }

        return this.router.createUrlTree(['/create/subcounty']);
      })
    );
  }
}
