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
 * Prevent accessing not found constituency ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateConstituency implements CanActivate {
  constructor(
    private constituencyService: WardConSubService,
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
    const constituencyId = route.params.id;

    return this.constituencyService.getConstituency(constituencyId).pipe(
      take(1),
      map((constituency) => {
        if (constituency) {
          return true;
        }

        return this.router.createUrlTree(['/create/constituencies']);
      })
    );
  }
}
