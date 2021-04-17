import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/shared/types/report';

@Component({
  styleUrls: ['./list-report.component.scss'],
  templateUrl: './list-report.component.html',
})
export class ListReportComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  reports: Report[];
  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Reports data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ reports }: { reports: Report[] }) => {
        this.reports = _.orderBy(reports, 'datePublished', 'desc');
      });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_REPORT',
      null,
      this.router.createUrlTree(['/list/report'], {
        queryParams: {
          select: this.selectable,
          id: this._cacheId,
          state: this._state,
        },
      }),
      () => {
        return null;
      }
    );

    this.router.navigate(['/upload/report'], {
      queryParams: {
        id: 'LIST_NEW_REPORT',
      },
    });
  }

  onDelete(id: string) {
    this.reportService.deleteReport(id).subscribe(() => {
      window.location.reload();
    });
  }

  onSelect(report: Report) {
    this.cacheService.emit(this._cacheId, report);
  }
}
