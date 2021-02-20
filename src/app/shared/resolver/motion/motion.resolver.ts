import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MotionService } from 'src/app/services/motion.service';
import { Motion } from 'src/app/shared/types/motion';

/**
 * Resolve Motion Data from url params
 *
 * @Example /generate/motion/60224665fd0c8e1b11fa85d5 -> Resolve motion data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class MotionResolver implements Resolve<Motion> {
  constructor(private motionService: MotionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const motionId = route.paramMap.get('id');

    return this.motionService.getMotion(motionId).pipe(take(1));
  }
}
