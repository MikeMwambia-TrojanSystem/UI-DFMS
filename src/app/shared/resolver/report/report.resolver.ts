import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/shared/types/report';

/**
 * Resolve Report Data from url params
 *
 * @Example /generate/report/60224665fd0c8e1b11fa85d5 -> Resolve report data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class ReportResolver implements Resolve<Report> {
  constructor(private reportService: ReportService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Report> | Promise<Report> | Report {
    const reportId = route.paramMap.get('id');

    return this.reportService.getReport(reportId).pipe(take(1));
  }
}
