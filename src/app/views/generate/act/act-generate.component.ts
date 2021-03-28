import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { ActService } from 'src/app/services/act.service';
import { ApiService } from 'src/app/services/api.service';
import { BillService } from 'src/app/services/bill.service';
import {
  CacheConfigs,
  CachedCallback,
  CacheService,
} from 'src/app/services/cache.service';
import { Act } from 'src/app/shared/types/act';
import { Upload, UploadPost } from 'src/app/shared/types/upload';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { Committee } from 'src/app/shared/types/committee';
import { Bill } from 'src/app/shared/types/bill';

@Component({
  templateUrl: './act-generate.component.html',
  styleUrls: ['./act-generate.component.scss'],
})
export class ActGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _actId: string;

  form = new FormGroup({
    titleOfAct: new FormControl('', Validators.required),
    actNo: new FormControl('', Validators.required),
    actsSignature: new FormControl(''),
    datePublished: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedFileURL: new FormControl('', Validators.required),
    uploadAccount: new FormControl('test upload account'),
    approvingAcc: new FormControl('speaker'),
    originatingBTitle: new FormControl('', Validators.required),
    orderPaperId: new FormControl('6041d62429d8ac0925674035'),
    sponsorId: new FormControl('', Validators.required),
    concernedCommiteeId: new FormControl('', Validators.required),
    relatedTo: new FormControl('', Validators.required),
    assemblyId: new FormControl('6041d62429d8ac0925674035'),
    published: new FormControl(false),
    sponsorName: new FormControl('', Validators.required),
    uploadId: new FormControl('6041d62429d8ac0925674035'),
    approvingAccId: new FormControl('6041d62429d8ac0925674035'),
    billId: new FormControl('', Validators.required),
    committeeName: new FormControl('', Validators.required),
    committeeNameId: new FormControl('', Validators.required),
    publishState: new FormControl('draft'),
  });

  billNo: number;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private actService: ActService,
    private apiService: ApiService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate act data from resolver using param id
    const actId = this.route.snapshot.params.id;
    if (actId) {
      this._mode = 'editing';
      this._actId = actId;

      this.route.data.pipe(take(1)).subscribe(({ act }: { act: Act }) => {
        const {
          approvingAccount,
          concernedCommiteeId,
          originatingBillId,
          sponsorId,
          uploadingAccount,
          datePublished,
          ...others
        } = act;

        this.form.patchValue({
          ...others,
          datePublished: moment(datePublished).toJSON().slice(0, 10),
          uploadAccount: uploadingAccount.uploadAccount,
          uploadId: uploadingAccount.uploadId,
          approvingAcc: approvingAccount.approvingAcc,
          approvingAccId: approvingAccount.approvingAccId,
          originatingBTitle: originatingBillId.originatingBTitle,
          billId: originatingBillId.originatingBId,
          sponsorId: sponsorId.sponsorId,
          sponsorName: sponsorId.sponsorName,
          concernedCommiteeId: concernedCommiteeId.committeeNameId,
          committeeName: concernedCommiteeId.committeeName,
          committeeNameId: concernedCommiteeId.committeeNameId,
        });
      });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<FormGroup>('GENERATE_ACT');

    if (cached) {
      this.form = cached;
    }

    // Get the selected bill no
    const billId = this.form.value.billId as string;

    if (billId && billId.length) {
      this.billService
        .getBill(billId)
        .pipe(take(1))
        .subscribe((bill) => (this.billNo = bill.billNo));
    }
  }

  get committeeName(): string {
    return this.form.value.committeeName;
  }

  get sponsorName(): string {
    return this.form.value.sponsorName;
  }

  get fileName(): string {
    const url = this.form.value.uploadedFileURL as string;
    return url.substring(url.lastIndexOf('amazonaws.com/') + 14);
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<FormGroup, T>,
    additionalData?: Record<string, any>,
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<FormGroup, T>({
      id: 'GENERATE_ACT',
      cacheId: this._cacheId,
      urlParamer: this._actId,
      returnUrl: '/generate/act',
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
          sponsorName: name,
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
          concernedCommiteeId: _id,
        }); // Patch form with selected committee

        return form;
      }
    );
  }

  /**
   * This function get called when 'Select Originate Bill' button is clicked.
   * Caching the form and then redirect the user to '/list/bill?select=true'.
   * After the user had selected the bill, a callback function will get called and update the cached data with the selected information.
   */
  onSelectOriginateBill() {
    this._onCache<Bill>({ url: '/list/bill' }, (form, { _id, titleOfBill }) => {
      form.patchValue({
        billId: _id,
        originatingBTitle: titleOfBill,
      });

      return form;
    });
  }

  /**
   * This function get called when 'Upload Act file' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'act',
        },
      },
      (form, { result }) => {
        form.patchValue({
          uploaded: true,
          uploadedFileURL: result.location,
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
      this.router.navigate(['/list/act'], {
        queryParams: {
          state: state,
        },
      });
    };

    /**
     * Act form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.published = state === 'public';
      value.publishState = state;

      if (this._mode === 'creating') {
        value.actsSignature = moment().unix();

        this.actService.postAct(value).subscribe(() => subCallback(state));
      } else {
        value.id = this._actId;

        this.actService.updateAct(value).subscribe(() => subCallback(state));
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
