import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Report, ReportPost } from '../shared/types/report';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _reports = new BehaviorSubject<any[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get reports() {
    return this._reports;
  }

  get fetched() {
    return this._fetched;
  }

  getReports(): Observable<Report[]> {
    return this._reports.pipe(
      switchMap((reports) =>
        iif(
          () => this._fetched,
          of(reports),
          this.fetchReports().pipe(map((result) => result))
        )
      )
    );
  }

  getReport(id: string): Observable<Report> {
    return this.getReports().pipe(
      map((reports) => reports.find((r) => r._id === id))
    );
  }

  fetchReports() {
    return this.apiService.getReports().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._reports.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  deleteReport(id: string) {
    return this.apiService.deleteReport(id).pipe(
      tap((report) => {
        const reportId = report._id;

        const newReports = this._reports
          .getValue()
          .filter((r) => r._id !== reportId);

        this._reports.next(newReports);
      })
    );
  }

  postReport(report: ReportPost) {
    return this.apiService.createReport(report).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._reports.next([...this._reports.getValue(), message]);
        }
      })
    );
  }

  updateReport(report: ReportPost) {
    return this.apiService.updateReport(report).pipe(
      tap((result) => {
        const newReports = this._reports.getValue();
        const index = newReports.findIndex((r) => r._id === result._id);

        newReports[index] = {
          ...result,
        };

        this._reports.next(newReports);
      })
    );
  }
}
