import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { ActService } from 'src/app/services/act.service';
import { ApiService } from 'src/app/services/api.service';
import { BillService } from 'src/app/services/bill.service';
import { CacheService } from 'src/app/services/cache.service';
import { Act } from 'src/app/shared/types/act';
import { UploadPost } from 'src/app/shared/types/upload';

@Component({
  templateUrl: './act-generate.component.html',
  styleUrls: ['./act-generate.component.scss'],
})
export class ActGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _actId: string;
  private _actUpload: UploadPost;

  form = new FormGroup({
    titleOfAct: new FormControl('', Validators.required),
    actNo: new FormControl('', Validators.required),
    actsSignature: new FormControl(''),
    datePublished: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedFileURL: new FormControl(''),
    uploadAccount: new FormControl('test upload account'),
    approvingAcc: new FormControl('speaker'),
    originatingBTitle: new FormControl('', Validators.required),
    orderPaperId: new FormControl('6041d62429d8ac0925674035'),
    sponsorId: new FormControl('', Validators.required),
    concernedCommiteeId: new FormControl('', Validators.required),
    relatedTo: new FormControl('', Validators.required),
    assemblyId: new FormControl('12345'),
    published: new FormControl(false),
    sponsorName: new FormControl('', Validators.required),
    uploadId: new FormControl('12345'),
    approvingAccId: new FormControl('12345'),
    billId: new FormControl('', Validators.required),
    committeeName: new FormControl('', Validators.required),
    committeeNameId: new FormControl('', Validators.required),
    publishState: new FormControl('draft'),
  });

  hasUploaded = false;
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
      this.hasUploaded = true;

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
    const cached = this.cacheService.rehydrate<{
      form: FormGroup;
      upload: UploadPost;
    }>('GENERATE_ACT');

    if (cached) {
      const { form, upload } = cached;
      this.form = form;
      this._actUpload = upload;

      if (upload) {
        this.hasUploaded = true;
      }
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
    try {
      return this._actUpload.myFile.name;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * This function get called when 'Sponsored By' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the sponsor, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSponsored() {
    // Caching and select callback handling
    const urlTree = this._cacheId
      ? ['/generate/act', this._cacheId]
      : ['/generate/act'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      { name: string; _id: string }
    >(
      'GENERATE_ACT',
      { form: this.form, upload: this._actUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { name, _id }) => {
        form.patchValue({
          sponsorName: name,
          sponsorId: _id,
        }); // Patch form with selected sponsor

        return { form, upload };
      }
    );

    // Navigate the user to '/list/mca-employee?select=true'
    this.router.navigate(['/list/mca-employee'], {
      queryParams: {
        select: true,
        id: 'GENERATE_ACT',
      },
    });
  }

  /**
   * This function get called when 'Select Concerned Committee' button is clicked.
   * Caching the form and then redirect the user to '/list/committee?select=true'.
   * After the user had selected the committee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectCommittee() {
    // Caching and select callback handling
    const urlTree = this._actId
      ? ['/generate/act', this._actId]
      : ['/generate/act'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      { name: string; _id: string }
    >(
      'GENERATE_ACT',
      { form: this.form, upload: this._actUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { name, _id }) => {
        form.patchValue({
          committeeName: name,
          committeeNameId: _id,
          concernedCommiteeId: _id,
        }); // Patch form with selected committee

        return { form, upload };
      }
    );

    // Navigate the user to '/list/committee?select=true'
    this.router.navigate(['/list/committee'], {
      queryParams: {
        select: true,
        id: 'GENERATE_ACT',
      },
    });
  }

  /**
   * This function get called when 'Select Originate Bill' button is clicked.
   * Caching the form and then redirect the user to '/list/bill?select=true'.
   * After the user had selected the bill, a callback function will get called and update the cached data with the selected information.
   */
  onSelectOriginateBill() {
    // Caching and select callback handling
    const urlTree = this._actId
      ? ['/generate/act', this._actId]
      : ['/generate/act'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      { _id: string; titleOfBill: string }
    >(
      'GENERATE_ACT',
      { form: this.form, upload: this._actUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { _id, titleOfBill }) => {
        form.patchValue({
          billId: _id,
          originatingBTitle: titleOfBill,
        });

        return { form, upload };
      }
    );

    // Navigate the user to '/list/bill?select=true'
    this.router.navigate(['/list/bill'], {
      queryParams: {
        select: true,
        id: 'GENERATE_ACT',
      },
    });
  }

  /**
   * This function get called when 'Upload Act file' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    // Caching and select callback handling
    const urlTree = this._actId
      ? ['/generate/act', this._actId]
      : ['/generate/act'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      UploadPost
    >(
      'GENERATE_ACT',
      { form: this.form, upload: this._actUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, uploadData) => {
        return {
          form,
          upload: uploadData,
        };
      }
    );

    // Navigate the user to '/management/upload'
    this.router.navigate(['/management/upload'], {
      queryParams: {
        id: 'GENERATE_ACT',
        category: 'act',
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
   * Afterwards, redirect user to /list/bill with the state depending on the user selected state.
   */
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/act'], {
          queryParams: {
            state: state,
          },
        });
      }
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
        const { documents, County, signature, myFile } = this._actUpload;
        const formData = new FormData();

        formData.append('documents', documents);
        formData.append('County', County);
        formData.append('signature', signature);
        formData.append('myFile', myFile);

        this.apiService.upload(formData).subscribe((result) => {
          value.actsSignature = new Date().toISOString();
          value.uploaded = true;
          value.uploadedFileURL = result.location;

          this.actService.postAct(value).subscribe(() => subCallback(state));
        });
      } else {
        value.id = this._actId;

        this.actService.updateAct(value).subscribe(() => subCallback(state));
      }
    };

    // If 'Publish' is clicked
    if (published) {
      // Caching and callback handling
      this.cacheService.cache<FormGroup, 'public' | 'private' | 'draft'>(
        'GENERATE_ACT',
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
          id: 'GENERATE_ACT',
        },
      });
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
