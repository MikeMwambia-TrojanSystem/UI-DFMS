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
import { ActService } from 'src/app/services/act.service';

/**
 * Prevent accessing not found act ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateAct implements CanActivate {
  constructor(private actService: ActService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const actId = route.params.id;

    return this.actService.getAct(actId).pipe(
      take(1),
      map((act) => {
        if (act && act.publishState !== 'public') {
          return true;
        }

        return this.router.createUrlTree(['/generate/act']);
      })
    );
  }
}
