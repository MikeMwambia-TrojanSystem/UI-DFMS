import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report.service';
import { Report } from '../../types/report';

/**
 * Resolve all Report data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListReportResolver implements Resolve<Report[]> {
  constructor(private reportService: ReportService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Report[]> | Promise<Report[]> | Report[] {
    const publishState = route.queryParams.state || 'public';

    return this.reportService.fetchReports().pipe(
      take(1),
      map((reports) => reports.filter((r) => r.publishState === publishState))
    );
  }
}
