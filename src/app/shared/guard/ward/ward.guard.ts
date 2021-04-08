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
 * Prevent accessing not found Ward ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateWard implements CanActivate {
  constructor(private wardService: WardConSubService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const wardId = route.params.id;

    return this.wardService.getWard(wardId).pipe(
      take(1),
      map((ward) => {
        if (ward && !ward.published) {
          return true;
        }

        return this.router.createUrlTree(['/create/wards']);
      })
    );
  }
}
