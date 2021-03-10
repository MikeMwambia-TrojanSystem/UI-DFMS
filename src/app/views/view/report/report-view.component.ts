import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { map } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
})
export class ReportViewComponent implements OnInit {
  private _cacheId: string;
  @ViewChild('pdfViewer') pdfViewer;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get query params
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id as string;

    try {
      const cachedData = this.cacheService.data[this._cacheId];

      if (!cachedData.subscription.closed) {
        const reportFile = cachedData.data.report.file as File;
        const reportUrl = cachedData.data.form.value.uploadedFileURL as string;

        if (reportFile) {
          const fileReader = new FileReader();

          fileReader.onload = () => {
            this.pdfViewer.pdfSrc = new Uint8Array(fileReader.result as any);
            this.pdfViewer.refresh();
          };

          fileReader.readAsArrayBuffer(reportFile);
        } else if (reportUrl) {
          this.http.get(reportUrl).subscribe((data) => {
            this.pdfViewer.pdfSrc = data;
            this.pdfViewer.refresh();
          });
        } else {
          throw new Error('NO_FILE');
        }
      } else {
        throw new Error('NO_SUB');
      }
    } catch (error) {
      console.log(error);

      alert('ERROR');
      this.location.back();
    }
  }

  onSave(preview: boolean) {
    if (!preview) {
      this.cacheService.emit(this._cacheId, 'draft');
    } else {
      this.router.navigate(['/publish-status'], {
        queryParams: {
          id: this._cacheId,
        },
      });
    }
  }
}
