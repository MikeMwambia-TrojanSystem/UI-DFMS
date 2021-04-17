import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NoticeOfMotionService } from 'src/app/services/notice-of-motion.service';
import { Motion } from 'src/app/shared/types/motion';

/**
 * Resolve all Notice of Motion data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListNoticeOfMotionResolver implements Resolve<Motion[]> {
  constructor(private noticeOfMotionService: NoticeOfMotionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Motion[]> | Promise<Motion[]> | Motion[] {
    const publishState = route.queryParams.state || 'public';
    return this.noticeOfMotionService.fetchNoticeOfMotions().pipe(
      take(1),
      map((notices) =>
        notices.filter((notice) => notice.publishState === publishState)
      )
    );
  }
}
