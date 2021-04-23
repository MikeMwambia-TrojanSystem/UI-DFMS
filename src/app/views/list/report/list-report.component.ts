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
  private _reports: Report[];
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
        const ordered = _.orderBy(reports, 'datePublished', 'desc');
        this._reports = ordered;
        this.reports = ordered;
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

  onApprove({
    annexus,
    approvingAccount,
    authorCommitee,
    originatingDocument,
    uploadingAccount,
    editors,
    uploadedFileURL,
    title,
    _id,
    ...others
  }: Report) {
    this.reportService
      .updateReport({
        ...others,
        authorCommitee: authorCommitee.name,
        authorCommiteeId: authorCommitee.id,
        originatingDocType: originatingDocument.type,
        originatingDocTypeId: originatingDocument.id,
        editors: editors.join('&&&'),
        uploadingAccount: uploadingAccount.name,
        uploaderId: uploadingAccount.id,
        account: approvingAccount.account,
        approverId: approvingAccount.approverId,
        annexusName: annexus.name,
        annexusId: annexus.id,
        uploadedAnexux: annexus.uploaded,
        uploadingUrl: annexus.uploadingUrl,
        uploadedFileURL,
        titleOfReport: title,
        published: true,
        id: _id,
      } as any)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.reports = this._reports.filter((i) =>
      _.lowerCase(i.title).includes(_.lowerCase(query))
    );
  }
}
