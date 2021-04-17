import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { ApiService } from 'src/app/services/api.service';
import { BillService } from 'src/app/services/bill.service';
import {
  CacheConfigs,
  CachedCallback,
  CacheService,
} from 'src/app/services/cache.service';
import { Upload, UploadPost } from 'src/app/shared/types/upload';
import { Bill } from 'src/app/shared/types/bill';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { Committee } from 'src/app/shared/types/committee';
import { Report } from 'src/app/shared/types/report';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.scss'],
})
export class BillGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _billId: string;

  form = new FormGroup({
    titleOfBill: new FormControl('', Validators.required),
    billNo: new FormControl('', Validators.required),
    billSignature: new FormControl(''),
    datePublished: new FormControl('', Validators.required),
    firstReadingDate: new FormControl('', Validators.required),
    secondReadingDate: new FormControl('', Validators.required),
    datePassed: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedBillURL: new FormControl('', Validators.required),
    approvingAcc: new FormControl(''),
    orderPaperId: new FormControl(''),
    sponsorId: new FormControl('', Validators.required),
    sponsor: new FormControl('', Validators.required),
    relatedTo: new FormControl('', Validators.required),
    assemblyId: new FormControl('60224665fd0c8e1b11fa85d5'),
    published: new FormControl(false),
    approvingAccId: new FormControl(''),
    committeeName: new FormControl('', Validators.required),
    committeeNameId: new FormControl('', Validators.required),
    billUploadedReportURL: new FormControl('', Validators.required),
    status: new FormControl('Accented Bill', Validators.required),
    publishStatus: new FormControl('draft', Validators.required),
    sponsorDescription: new FormControl('', Validators.required),
  });

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private billService: BillService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate petition data from resolver using param id
    const billId = this.route.snapshot.params.id;
    if (billId) {
      this._mode = 'editing';
      this._billId = billId;

      this.route.data.pipe(take(1)).subscribe(({ bill }: { bill: Bill }) => {
        const {
          approvingAccount,
          concernedCommiteeId,
          datePublished,
          firstReadingDate,
          secondReadingDate,
          sponsor,
          datePassed,
          title,
          ...others
        } = bill;

        this.form.patchValue({
          ...others,
          titleOfBill: title || '',
          datePublished: moment(datePublished).toJSON().slice(0, 10),
          firstReadingDate: moment(firstReadingDate).toJSON().slice(0, 10),
          secondReadingDate: moment(secondReadingDate).toJSON().slice(0, 10),
          datePassed: moment(datePassed).toJSON().slice(0, 10),
          approvingAcc: approvingAccount.approvingAcc,
          sponsorId: sponsor.id,
          sponsor: sponsor.name,
          approvingAccId: approvingAccount.approvingAccId,
          committeeName: concernedCommiteeId.committeeName,
          committeeNameId: concernedCommiteeId.committeeNameId,
        });
      });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<FormGroup>('GENERATE_BILL');

    if (cached) {
      this.form = cached;
    }
  }

  get committeeName(): string {
    const name = this.form.value.committeeName;
    return name.length ? name : undefined;
  }

  get sponsorName(): string {
    const name = this.form.value.sponsor;
    return name.length ? name : undefined;
  }

  get billName(): string {
    const url = this.form.value.uploadedBillURL as string;
    return url.length
      ? url.substring(url.lastIndexOf('amazonaws.com/') + 14)
      : undefined;
  }

  get reportName(): string {
    const url = this.form.value.billUploadedReportURL as string;
    return url.length
      ? url.substring(url.lastIndexOf('amazonaws.com/') + 14)
      : undefined;
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<FormGroup, T>,
    otherData?: Record<string, any>,
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<FormGroup, T>({
      id: 'GENERATE_BILL',
      cacheId: this._cacheId,
      urlParamer: this._billId,
      returnUrl: '/generate/bill',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: this.form,
      callback,
      configs,
    })();
  }

  /**
   * This function get called when 'Sponsored By' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the sponsor, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSponsored() {
    this._onCache<McaEmployee>(
      { url: '/list/mca-employee' },
      (form, { name, _id }) => {
        form.patchValue({
          sponsor: name,
          sponsorId: _id,
        }); // Patch form with selected sponsor

        return form;
      }
    );
  }

  /**
   * This function get called when 'Select Concerned Committee' button is clicked.
   * Caching the form and then redirect the user to '/list/committee?select=true'.
   * After the user had selected the committee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectCommittee() {
    this._onCache<Committee>(
      { url: '/list/committee' },
      (form, { name, _id }) => {
        form.patchValue({
          committeeName: name,
          committeeNameId: _id,
        }); // Patch form with selected committee

        return form;
      }
    );
  }

  /**
   * This function get called when 'Select Bill Report' button is clicked.
   * Caching the form and then redirect the user to '/list/report?select=true'.
   * After the user had selected the report, a callback function will get called and update the cached data with the selected information.
   */
  onSelectBillReport() {
    this._onCache<Report>(
      { url: '/list/report' },
      (form, { uploadedFileURL }) => {
        form.patchValue({
          billUploadedReportURL: uploadedFileURL,
        });

        return form;
      }
    );
  }

  /**
   * This function get called when 'Upload Bill Soft copy' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'bill',
        },
      },
      (form, { result }) => {
        form.patchValue({
          uploaded: true,
          uploadedBillURL: result.location,
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
   * Afterwards, redirect user to /list/bill with the state depending on the user selected state.
   */
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      this.cacheService.clearCache('GENERATE_BILL');

      this.router.navigate(['/list/bill'], {
        queryParams: {
          state: state,
        },
      });
    };

    /**
     * Bill form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.publishState = state;

      if (this._mode === 'creating') {
        value.billSignature = moment().unix();
        value.uploadingPersonnel = this.accountService.user._id;

        this.billService.postBill(value).subscribe(() => subCallback(state));
      } else {
        const {
          titleOfBill,
          billNo,
          firstReadingDate,
          secondReadingDate,
          datePassed,
          uploadedBillURL,
          sponsorId,
          sponsor,
          relatedTo,
          committeeName,
          committeeNameId,
          billUploadedReportURL,
          publishStatus,
          sponsorDescription,
        } = value;

        this.billService
          .updateBill({
            id: this._billId,
            titleOfBill,
            billNo,
            firstReadingDate,
            secondReadingDate,
            datePassed,
            uploadedBillURL,
            sponsorId,
            sponsor,
            relatedTo,
            committeeName,
            committeeNameId,
            billUploadedReportURL,
            publishStatus,
            sponsorDescription,
          } as any)
          .subscribe(() => subCallback(state));
      }
    };

    // If 'Publish' is clicked
    if (published) {
      this._onCache<'public' | 'private' | 'draft'>(
        {
          url: '/publish-status',
          queryParams: {
            select: undefined,
          },
        },
        (cachedData, selected) => {
          post(selected);

          return cachedData;
        },
        undefined,
        {
          redirect: false,
        }
      );
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
