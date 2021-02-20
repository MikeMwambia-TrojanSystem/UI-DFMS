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
 * Resolve all Motion data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListMotionResolver implements Resolve<Motion[]> {
  constructor(private motionService: MotionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Motion[]> | Promise<Motion[]> | Motion[] {
    return this.motionService.getMotions().pipe(take(1));
  }
}
