import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { CacheService } from 'src/app/services/cache.service';
import { StatementService } from 'src/app/services/statement.service';
import { Statement } from 'src/app/shared/types/statement';
import { UploadPost } from 'src/app/shared/types/upload';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './statement-upload.component.html',
  styleUrls: ['./statement-upload.component.scss'],
})
export class StatementUploadComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _statementId: string;
  private _statementUpload: UploadPost;
  form = new FormGroup({
    statementSignature: new FormControl('dedpelpdldpedlepldepdlepdleplp'),
    statementNo: new FormControl('', Validators.required),
    seeker: new FormControl('', Validators.required),
    seekerId: new FormControl('602677b307f6184108b890a6'),
    seekerPosition: new FormControl('MCA National Assembly'),
    subjectOfStatement: new FormControl('', Validators.required),
    statementProvider: new FormControl('Test Committee'),
    statementProviderId: new FormControl('6026839d07f6184108b890ac'),
    department: new FormControl('', Validators.required),
    departmentResponsible: new FormControl('', Validators.required),
    dateStatementSought: new FormControl('', Validators.required),
    dateStatementToResponded: new FormControl('', Validators.required),
    uploaded: new FormControl('false'),
    uploadedFileURL: new FormControl(''),
    status: new FormControl('pending'),
    assemblyId: new FormControl('602651242ed6962b8b5be6f9'),
    published: new FormControl(false),
    datePublished: new FormControl(''),
    approverId: new FormControl('565564564654564564545645646'),
    account: new FormControl('Speaker'),
  });

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private statementService: StatementService,
    private apiService: ApiService
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
            approvingAccount,
            seeker,
            statementProvider,
            dateStatementSought,
            dateStatementToResponded,
            ...others
          } = statement;

          this.form.patchValue({
            ...others,
            seeker: seeker.name,
            seekerId: seeker.id,
            seekerPostition: seeker.position,
            account: approvingAccount.account,
            approverId: approvingAccount.approverId,
            department: statementProvider.department,
            statementProviderId: statementProvider.id,
            statementProvider: statementProvider.name,
            dateStatementSought: moment(dateStatementSought)
              .toJSON()
              .slice(0, 10),
            dateStatementToResponded: moment(dateStatementToResponded)
              .toJSON()
              .slice(0, 10),
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<FormGroup>('UPLOAD_STATEMENT');
    const cachedUpload = this.cacheService.rehydrate<{
      form: FormGroup;
      upload: UploadPost;
    }>('UPLOAD_STATEMENT_FILE');

    if (cached) {
      this.form = cached;
    }
    if (cachedUpload) {
      this.form = cachedUpload.form;
      this._statementUpload = cachedUpload.upload;
    }
  }

  get fileName() {
    try {
      return this._statementUpload.myFile.name;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * This function get called when 'Upload Statement' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded the statement, a callback function will get called and update the cached data with the uploaded information.
   */
  onUploadStatement() {
    // Caching and select callback handling
    const urlTree = this._statementId
      ? ['/upload/statement', this._statementId]
      : ['/upload/statement'];

    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      UploadPost
    >(
      'UPLOAD_STATEMENT_FILE',
      {
        form: this.form,
        upload: this._statementUpload,
      },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (data, uploadData) => {
        return {
          ...data,
          upload: uploadData,
        };
      }
    );

    // Navigate the user to '/management/upload'
    this.router.navigate(['/management/upload'], {
      queryParams: {
        id: 'UPLOAD_STATEMENT_FILE',
        category: 'statement',
      },
    });
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
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/statement'], {
          queryParams: {
            state: state,
          },
        });
      }
    };

    /**
     * Form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.published = state === 'public';
      value.publishState = state;
      value.datePublished = moment().toISOString();
      value.dateStatementSought = moment(
        value.dateStatementSought
      ).toISOString();
      value.dateStatementToResponded = moment(
        value.dateStatementToResponded
      ).toISOString();

      if (this._mode === 'creating') {
        const { documents, County, signature, myFile } = this._statementUpload;
        const formData = new FormData();

        formData.append('documents', documents);
        formData.append('County', County);
        formData.append('signature', signature);
        formData.append('myFile', myFile);

        this.apiService.upload(formData).subscribe((result) => {
          value.uploaded = 'true';
          value.uploadedFileURL = result.location;

          this.statementService
            .postStatement(value)
            .subscribe(() => subCallback(state));
        });
      } else {
        value.id = this._statementId;

        this.statementService
          .updateStatement(value)
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
