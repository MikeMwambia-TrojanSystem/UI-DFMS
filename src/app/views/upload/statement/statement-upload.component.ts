import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { CachedCallback, CacheService } from 'src/app/services/cache.service';
import { StatementService } from 'src/app/services/statement.service';
import { Statement } from 'src/app/shared/types/statement';
import { Upload, UploadPost } from 'src/app/shared/types/upload';
import { ApiService } from 'src/app/services/api.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { Committee } from 'src/app/shared/types/committee';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './statement-upload.component.html',
  styleUrls: ['./statement-upload.component.scss'],
})
export class StatementUploadComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _statementId: string;

  form = new FormGroup({
    statementSignature: new FormControl(''),
    statementNo: new FormControl('', Validators.required),
    seeker: new FormControl('', Validators.required),
    seekerId: new FormControl('', Validators.required),
    subjectOfStatement: new FormControl('', Validators.required),
    statementProvider: new FormControl('', Validators.required),
    statementProviderId: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    departmentResponsible: new FormControl('', Validators.required),
    dateStatementSought: new FormControl('', Validators.required),
    dateStatementToResponded: new FormControl('', Validators.required),
    uploaded: new FormControl('false'),
    uploadedFileURL: new FormControl('', Validators.required),
    status: new FormControl('pending'),
    assemblyId: new FormControl('602651242ed6962b8b5be6f9'),
    published: new FormControl(false),
    datePublished: new FormControl(''),
    approverId: new FormControl(''),
    account: new FormControl(''),
    publishState: new FormControl(''),
    seekerDescription: new FormControl('', Validators.required),
  });

  filename: string;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private statementService: StatementService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate statement data from resolver using param statementId
    const statementId = this.route.snapshot.params.id;
    if (statementId) {
      this._mode = 'editing';
      this._statementId = statementId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ statement }: { statement: Statement }) => {
          const {
            seeker,
            statementProvider,
            dateStatementSought,
            dateStatementToResponded,
            seekerDescription,
            title,
            ...others
          } = statement;

          this.form.patchValue({
            ...others,
            statementNo: title ? title.toString() : '',
            seeker: seeker.name || '',
            seekerId: seeker.id || '',
            seekerDescription: seekerDescription || '',
            department: statementProvider.department || '',
            statementProviderId: statementProvider.id || '',
            statementProvider: statementProvider.name || '',
            dateStatementSought:
              moment(dateStatementSought).toJSON().slice(0, 10) || '',
            dateStatementToResponded:
              moment(dateStatementToResponded).toJSON().slice(0, 10) || '',
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<FormGroup>('UPLOAD_STATEMENT');

    if (cached) {
      this.form = cached;
    }

    const url = this.form.get('uploadedFileURL').value;

    this.filename = url.substring(url.lastIndexOf('amazonaws.com/') + 14);
  }

  get seekerName(): string {
    return this.form.value.seeker.length ? this.form.value.seeker : undefined;
  }

  get providerName(): string {
    return this.form.value.statementProvider.length
      ? this.form.value.statementProvider
      : undefined;
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<FormGroup, T>
  ) {
    // Caching and select callback handling
    const urlTree = this._statementId
      ? ['/upload/statement', this._statementId]
      : ['/upload/statement'];

    this.cacheService.cache<FormGroup, T>(
      'UPLOAD_STATEMENT',
      this.form,
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      callback
    );

    this.router.navigate([url], {
      queryParams: {
        id: 'UPLOAD_STATEMENT',
        select: true,
        ...queryParams,
      },
    });
  }

  /**
   * This function get called when 'Upload Statement' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded the statement, a callback function will get called and update the cached data with the uploaded information.
   */
  onUploadStatement() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'statement',
        },
      },
      (form, { result }) => {
        form.patchValue({
          uploaded: 'true',
          uploadedFileURL: result.location,
        });

        return form;
      }
    );
  }

  /**
   * This function get called when 'Who is Seeking the Statement' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee'.
   * After the user had selected the mca, a callback function will get called and update the cached data with the uploaded information.
   */
  onSelectSeeker() {
    this._onCache<McaEmployee>(
      { url: '/list/mca-employee' },
      (form, { name, _id }) => {
        form.patchValue({
          seeker: name,
          seekerId: _id,
        });

        return form;
      }
    );
  }

  /**
   * This function get called when 'Statement request directed to?' button is clicked.
   * Caching the form and then redirect the user to '/list/committee'.
   * After the user had selected the committee, a callback function will get called and update the cached data with the uploaded information.
   */
  onSelectRequestTo() {
    this._onCache<Committee>(
      { url: '/list/committee' },
      (form, { name, _id, departmentInExcecutive }) => {
        form.patchValue({
          statementProvider: name,
          statementProviderId: _id,
          department: departmentInExcecutive,
          departmentResponsible: departmentInExcecutive,
        });

        return form;
      }
    );
  }

  /**
   * This function get called when 'Publish' or 'Save as Draft' buttons is clicked.
   *
   * If the 'Publsh' button is clicked, caching the form and then redirect the user to '/publish-status'.
   * After the user had selected the publish status, a callback function will get called and a post request will be sent to the backend.
   *
   * If the 'Save as Draft' button is clicked, a post request will be sent to the backend.
   *
   * Afterwards, redirect user to /list/statement with the state depending on the user selected state.
   */
  onSave(published: boolean) {
    // Subscription Callback
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      this.cacheService.clearCache(this._cacheId);

      this.router.navigate(['/list/statement'], {
        queryParams: {
          state: state,
        },
      });
    };

    /**
     * Form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.publishState = state;

      if (this._mode === 'creating') {
        value.datePublished = moment().toISOString();
        value.statementSignature = moment().unix();
        value.dateStatementSought = moment(
          value.dateStatementSought
        ).toISOString();
        value.dateStatementToResponded = moment(
          value.dateStatementToResponded
        ).toISOString();

        this.statementService
          .postStatement(value)
          .subscribe(() => subCallback(state));
      } else {
        value.id = this._statementId;

        const {
          statementNo,
          seeker,
          seekerId,
          subjectOfStatement,
          statementProvider,
          statementProviderId,
          department,
          departmentResponsible,
          dateStatementSought,
          dateStatementToResponded,
          uploadedFileURL,
          seekerDescription,
        } = value;

        this.statementService
          .updateStatement({
            statementNo,
            seeker,
            seekerId,
            subjectOfStatement,
            statementProvider,
            statementProviderId,
            department,
            departmentResponsible,
            dateStatementSought,
            dateStatementToResponded,
            uploadedFileURL,
            seekerDescription,
            id: this._statementId,
          } as any)
          .subscribe(() => subCallback(state));
      }
    };

    // If 'Publish' is clicked
    if (published) {
      // Caching and callback handling
      this.cacheService.cache<FormGroup, 'public' | 'private' | 'draft'>(
        'UPLOAD_STATEMENT',
        this.form,
        null,
        (cachedData, selected) => {
          post(selected);

          return cachedData;
        }
      );

      // Navigate the user to '/publish-status'
      this.router.navigate(['/publish-status'], {
        queryParams: {
          id: 'UPLOAD_STATEMENT',
        },
      });
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
