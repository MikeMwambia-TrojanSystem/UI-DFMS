import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

import { BillService } from 'src/app/services/bill.service';
import {
  CacheConfigs,
  CachedCallback,
  CacheService,
} from 'src/app/services/cache.service';
import { DepartmentService } from 'src/app/services/department.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { PetitionService } from 'src/app/services/petition.service';
import { ReportService } from 'src/app/services/report.service';
import { StatementService } from 'src/app/services/statement.service';
import { Committee } from 'src/app/shared/types/committee';
import { Personnel } from 'src/app/shared/types/personnel';
import { Report } from 'src/app/shared/types/report';
import { Upload } from 'src/app/shared/types/upload';

type Cache = {
  form: FormGroup;
  report: { name: string; file: File };
  annexus: { name: string; file: File };
};

const LIST_PAGES = {
  petition: 'petition',
  statement: 'statement',
  bill: 'bill',
  departmentalReport: 'department',
};

@Component({
  selector: 'app-upload-report',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.scss'],
})
export class ReportUploadComponent {
  private $onDestroy = new Subject<void>();
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _reportId: string;

  form = new FormGroup({
    reportSignature: new FormControl(''),
    titleOfReport: new FormControl('', Validators.required),
    authorCommitee: new FormControl('', Validators.required),
    authorCommiteeId: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    originatingDocType: new FormControl('', Validators.required),
    originatingDocTypeId: new FormControl('', Validators.required),
    editors: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedFileURL: new FormControl(''),
    uploadingAccount: new FormControl(''),
    uploaderId: new FormControl(''),
    account: new FormControl(''),
    approverId: new FormControl(''),
    annexusName: new FormControl(''),
    annexusId: new FormControl(''),
    uploadedAnexux: new FormControl(false),
    uploadingUrl: new FormControl(''),
    datePublished: new FormControl(''),
    orderPaperId: new FormControl(''),
    relatedTo: new FormControl('test related to'),
    assemblyId: new FormControl('60266ae8c8e745386efc6d36'),
    published: new FormControl(false),
    publishState: new FormControl('draft'),
  });

  originatings = [
    'petition',
    'statement',
    'bill',
    'departmentalReport',
    'others',
  ];
  originatingsTitle = [
    'Petitions',
    'Statements',
    'Bills',
    'Departmental Report',
    'Others',
  ];
  editors: Personnel[] = [];
  originatingName = '';
  report: File;
  reportName: string;
  annexus: File;
  annexusName: string;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private personnelService: PersonnelService,
    private petitionService: PetitionService,
    private statementService: StatementService,
    private billService: BillService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate act data from resolver using param id
    const reportId = this.route.snapshot.params.id;
    if (reportId) {
      this._mode = 'editing';
      this._reportId = reportId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ report }: { report: Report }) => {
          const {
            annexus,
            approvingAccount,
            authorCommitee,
            originatingDocument,
            dueDate,
            uploadingAccount,
            editors,
            uploadedFileURL,
            title,
            ...others
          } = report;

          this.form.patchValue({
            ...others,
            authorCommitee: authorCommitee.name,
            authorCommiteeId: authorCommitee.id,
            dueDate: moment(dueDate).toJSON().slice(0, 10),
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
          });

          this.reportName = 'edit';
          // this.reportName = uploadedFileURL.length
          //   ? uploadedFileURL.substring(
          //       uploadedFileURL.lastIndexOf('amazonaws.com/') + 14
          //     )
          //   : undefined;
          this.annexusName = annexus.uploadingUrl.length
            ? annexus.uploadingUrl.substring(
                annexus.uploadingUrl.lastIndexOf('amazonaws.com/') + 14
              )
            : undefined;
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<Cache>('UPLOAD_REPORT');

    if (cached) {
      const { form, report, annexus } = cached;

      this.form = form;
      this.report = report.file;
      this.reportName = report.name;
      this.annexus = annexus.file;
      this.annexusName = annexus.name;
    }

    // Updating information when first time opening this page
    this.updateEditors();
    this.updateOriginating();

    // Change the originating whenever the type of originating document changed
    this.form
      .get('originatingDocType')
      .valueChanges.pipe(takeUntil(this.$onDestroy))
      .subscribe(() => {
        this.form.patchValue({
          originatingDocTypeId: '',
        });

        this.updateOriginating();
      });
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  get originating(): string {
    const type = this.form.value.originatingDocType;
    switch (type) {
      case 'petition':
        return 'Petitions';
      case 'statement':
        return 'Statements';
      case 'bill':
        return 'Bills';
      case 'departmentalReport':
        return 'Departmental Report';
    }
  }

  get committee(): string {
    return this.form.value.authorCommitee;
  }
  // Get the editors name from editor ids field
  updateEditors() {
    const editorsStr = this.form.value.editors as string;
    const editorIds = editorsStr.split('&&&');
    let editors = [];

    for (const id of editorIds) {
      if (id.length) {
        this.personnelService
          .getPersonnel(id)
          .pipe(take(1))
          .subscribe((personnel) => {
            if (personnel) {
              editors.push(personnel);
            }
          });
      }
    }

    this.editors = editors;
  }

  // Handling originating document
  updateOriginating() {
    const id = this.form.value.originatingDocTypeId as string;
    const type = this.form.value.originatingDocType as
      | 'petition'
      | 'bill'
      | 'statement'
      | 'departmentalReport';

    if (id.length) {
      // Reset the originating document whenever the document type changed
      this.originatingName = '';

      // Get originating document
      if (type === 'petition') {
        this.petitionService
          .getPetition(id)
          .pipe(take(1))
          .subscribe((petition) => {
            this.originatingName = petition ? petition.content : '';
          });
      }
      if (type === 'bill') {
        this.billService
          .getBill(id)
          .pipe(take(1))
          .subscribe((bill) => {
            this.originatingName = bill ? bill.title : '';
          });
      }
      if (type === 'statement') {
        this.statementService
          .getStatement(id)
          .pipe(take(1))
          .subscribe((statement) => {
            this.originatingName = statement
              ? statement.subjectOfStatement
              : '';
          });
      }
      if (type === 'departmentalReport') {
        this.departmentService
          .getDepartment(id)
          .pipe(take(1))
          .subscribe((department) => {
            this.originatingName = department ? department.name : '';
          });
      }
    }
  }

  // 'Delete' editor button
  onEditorDelete(id: string) {
    let editors = this.form.value.editors;

    editors = editors.replace(id, '');
    editors = editors.replace('&&&&&&', '&&&');

    if (editors.charAt(0) === '&') {
      editors = editors.substring(3);
    }

    this.form.patchValue({
      editors,
    });

    const index = this.editors.findIndex((e) => e._id === id);
    this.editors.splice(index, 1);
  }

  // Caching form and redirecting handling
  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<Cache, T>,
    otherData?: Record<string, any>,
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<Cache, T>({
      id: 'UPLOAD_REPORT',
      cacheId: this._cacheId,
      urlParamer: this._reportId,
      returnUrl: '/upload/report',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: {
        form: this.form,
        report: { name: this.reportName, file: this.report },
        annexus: { name: this.annexusName, file: this.annexus },
        ...otherData,
      },
      callback,
      configs,
    })();
  }

  // 'Select Author Concerned Committee' button handling
  onSelectCommittee() {
    this._onCache<Committee>(
      { url: '/list/committee' },
      ({ form, report, annexus }, { name, _id }) => {
        form.patchValue({
          authorCommitee: name,
          // author: name,
          authorCommiteeId: _id,
        }); // Patch form with selected committee

        return { form, report, annexus };
      }
    );
  }

  // 'Add Originating ...' button handling
  onSelectOriginatingDoc() {
    this._onCache<any>(
      { url: `/list/${LIST_PAGES[this.form.value.originatingDocType]}` },
      ({ form, ...others }, { _id }) => {
        form.patchValue({
          originatingDocTypeId: _id,
        });

        return { form, ...others };
      }
    );
  }

  // 'Add Editors' button handling
  onSelectEditor() {
    this._onCache<Personnel>(
      { url: '/list/personnel' },
      ({ form, ...others }, { _id }) => {
        let editors = this.form.value.editors as string;

        editors = editors.replace(_id, '');
        editors = editors.replace('&&&&&&', '&&&');

        if (editors.charAt(0) === '&') {
          editors = editors.substring(3);
        }

        editors = editors.length ? editors + `&&&${_id}` : _id;

        form.patchValue({
          editors,
        });

        return { form, ...others };
      }
    );
  }

  // 'Upload Report' button handling
  onUploadReport() {
    this._onCache<{ result: Upload; file: File }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'report',
        },
      },
      ({ form, ...others }, { result, file }) => {
        form.patchValue({
          uploaded: true,
          uploadedFileURL: result.location,
        });

        return {
          ...others,
          form,
          report: {
            name: result.key,
            file,
          },
        };
      }
    );
  }

  // 'Upload Annexus' button handling
  onUploadAnnexus() {
    this._onCache<{ result: Upload; file: File }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'annexus',
        },
      },
      ({ form, annexus, ...others }, { result, file }) => {
        form.patchValue({
          annexusName: result.key,
          annexusId: result.id,
          uploadedAnexux: true,
          uploadingUrl: result.location,
        });

        return {
          ...others,
          form,
          annexus: { name: result.key, file },
        };
      }
    );
  }

  // 'Save as Draft' and 'Preview Report' buttons handling
  onSave(content: boolean) {
    const post = (state: 'draft' | 'private' | 'public') => {
      const navigating = () => {
        this.cacheService.clearCache('UPLOAD_REPORT');

        this.router.navigate(['/list/report'], {
          queryParams: {
            state: state,
          },
        });
      };
      const value = this.form.value;

      value.publishState = state;

      if (this._mode === 'creating') {
        value.reportSignature = moment().unix();
        value.datePublished = moment().toISOString();
        // value.uploadingAccount = this.accountService.user.username;
        // value.uploaderId = this.accountService.user._id;

        this.reportService.postReport(value).subscribe(navigating);
      } else {
        value.id = this._reportId;
        this.reportService.updateReport(value).subscribe(navigating);
      }
    };

    if (content) {
      if (this._mode === 'editing') {
        this.cacheService.cacheFunc({
          id: 'UPLOAD_REPORT_FILE',
          cacheId: this._cacheId,
          urlParamer: this._reportId,
          returnUrl: undefined,
          navigateUrl: 'management/upload',
          navigateUrlQuery: {
            select: undefined,
            category: 'report',
          },
          data: {
            form: this.form,
            report: { name: this.reportName, file: this.report },
            annexus: { name: this.annexusName, file: this.annexus },
          },
          callback: ({ form, ...others }, { result, file }) => {
            form.patchValue({
              uploaded: true,
              uploadedFileURL: result.location,
            });

            this._onCache<'draft' | 'private' | 'public'>(
              {
                url: '/view/report',
                queryParams: {
                  select: undefined,
                },
              },
              (data, status) => {
                post(status);

                return data;
              },
              {
                ...others,
                form,
                report: {
                  name: result.key,
                  file,
                },
              },
              { redirect: false }
            );

            return {
              ...others,
              form,
              report: {
                name: result.key,
                file,
              },
            };
          },
          configs: {
            redirect: false,
          },
        })();
      } else {
        this._onCache<'draft' | 'private' | 'public'>(
          {
            url: '/view/report',
            queryParams: {
              select: undefined,
            },
          },
          (data, status) => {
            post(status);

            return data;
          },
          undefined,
          { redirect: false }
        );
      }
    } else {
      post('draft');
    }
  }
}
