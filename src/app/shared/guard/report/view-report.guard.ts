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
import { ReportService } from 'src/app/services/report.service';

/**
 * Prevent accessing not found report ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateViewUploadReport implements CanActivate {
  constructor(private reportService: ReportService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const reportId = route.params.id;

    return this.reportService.getReport(reportId).pipe(
      take(1),
      map((report) => {
        if (report) {
          return true;
        }

        return this.router.createUrlTree(['/upload/report']);
      })
    );
  }
}
