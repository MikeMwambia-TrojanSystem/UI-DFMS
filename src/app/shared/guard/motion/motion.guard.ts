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
import { MotionService } from 'src/app/services/motion.service';

/**
 * Prevent accessing not found motion ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateMotion implements CanActivate {
  constructor(private motionService: MotionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const motionId = route.params.id;

    return this.motionService.getMotion(motionId).pipe(
      take(1),
      map((motion) => {
        if (motion) {
          return true;
        }

        return this.router.createUrlTree(['/generate/motion']);
      })
    );
  }
}
