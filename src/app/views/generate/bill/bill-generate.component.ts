import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { ApiService } from 'src/app/services/api.service';
import { BillService } from 'src/app/services/bill.service';
import { CacheService } from 'src/app/services/cache.service';
import { UploadPost } from 'src/app/shared/types/upload';
import { Bill } from 'src/app/shared/types/bill';

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.scss'],
})
export class BillGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _billId: string;
  private _billUpload: UploadPost;

  form = new FormGroup({
    titleOfBill: new FormControl('', Validators.required),
    billNo: new FormControl('', Validators.required),
    billSignature: new FormControl('',),
    datePublished: new FormControl('', Validators.required),
    firstReadingDate: new FormControl('', Validators.required),
    secondReadingDate: new FormControl('', Validators.required),
    datePassed: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedBillURL: new FormControl(''),
    approvingAcc: new FormControl('test approving acc', Validators.required),
    orderPaperId: new FormControl('12345', Validators.required),
    sponsorId: new FormControl('', Validators.required),
    sponsor: new FormControl('', Validators.required),
    relatedTo: new FormControl('test related to',),
    assemblyId: new FormControl('12345'),
    published: new FormControl(false,),
    approvingAccId: new FormControl('12345'),
    committeeName: new FormControl('', Validators.required),
    committeeNameId: new FormControl('', Validators.required),
    billUploadedReportURL: new FormControl('http://google.com'),
    status: new FormControl('Accented Bill', Validators.required),
    uploadingPersonnel: new FormControl('test personnel', Validators.required),
    uploadAccname: new FormControl('test upload accname'),
    publishStatus: new FormControl('draft', Validators.required),
  });

  hasUploaded = false;

  constructor(private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private billService: BillService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate petition data from resolver using param id
    const billId = this.route.snapshot.params.id;
    if (billId) {
      this._mode = 'editing';
      this._billId = billId;
      this.hasUploaded = true;

      this.route.data
        .pipe(take(1))
        .subscribe(({ bill }: { bill: Bill }) => {
          const { approvingAccount, concernedCommiteeId, datePublished, firstReadingDate, secondReadingDate, sponsor, uploadingAccount, datePassed, ...others } = bill;

          this.form.patchValue({
            ...others,
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
            uploadingPersonnel: uploadingAccount.uploadingPersonnel,
            uploadAccname: uploadingAccount.uploadAccname
          })
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<{ form: FormGroup, upload: UploadPost }>('GENERATE_BILL');

    if (cached) {
      const { form, upload } = cached;
      this.form = form;
      this._billUpload = upload;

      if (upload) {
        this.hasUploaded = true
      }
    }
  }

  get committeeName(): string {
    return this.form.value.committeeName;
  }

  get sponsorName(): string {
    return this.form.value.sponsor;
  }

  get fileName(): string {
    try {
      return this._billUpload.myFile.name;
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
    const urlTree = this._billId
      ? ['/generate/bill', this._billId]
      : ['/generate/bill'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, { name: string; _id: string }>(
      'GENERATE_BILL',
      { form: this.form, upload: this._billUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { name, _id }) => {
        form.patchValue({
          sponsor: name,
          sponsorId: _id,
        }); // Patch form with selected sponsor

        return { form, upload };
      }
    );

    // Navigate the user to '/list/mca-employee?select=true'
    this.router.navigate(['/list/mca-employee'], {
      queryParams: {
        select: true,
        id: 'GENERATE_BILL',
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
    const urlTree = this._billId
      ? ['/generate/bill', this._billId]
      : ['/generate/bill'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, { name: string; _id: string }>(
      'GENERATE_BILL',
      { form: this.form, upload: this._billUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { name, _id }) => {
        form.patchValue({
          committeeName: name,
          committeeNameId: _id,
        }); // Patch form with selected committee

        return { form, upload };
      }
    );

    // Navigate the user to '/list/committee?select=true'
    this.router.navigate(['/list/committee'], {
      queryParams: {
        select: true,
        id: 'GENERATE_BILL',
      },
    });
  }

  /**
   * This function get called when 'Select Bill Report' button is clicked.
   * Caching the form and then redirect the user to '/list/report?select=true'.
   * After the user had selected the report, a callback function will get called and update the cached data with the selected information.
   */
  onSelectBillReport() {
    // Caching and select callback handling
    const urlTree = this._billId
      ? ['/generate/bill', this._billId]
      : ['/generate/bill'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, null>(
      'GENERATE_BILL',
      { form: this.form, upload: this._billUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }) => {
        return { form, upload };
      }
    );

    // Navigate the user to '/list/report?select=true'
    this.router.navigate(['/list/report'], {
      queryParams: {
        select: true,
        id: 'GENERATE_BILL',
      },
    });
  }

  /**
   * This function get called when 'Upload Bill Soft copy' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    // Caching and select callback handling
    const urlTree = this._billId
      ? ['/generate/bill', this._billId]
      : ['/generate/bill'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, UploadPost>(
      'GENERATE_BILL',
      { form: this.form, upload: this._billUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, uploadData) => {
        return {
          form,
          upload: uploadData
        }
      }
    );

    // Navigate the user to '/management/upload'
    this.router.navigate(['/management/upload'], {
      queryParams: {
        id: 'GENERATE_BILL',
        category: 'bill'
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
        this.router.navigate(['/list/bill'], {
          queryParams: {
            state: state,
          },
        });
      }
    }

    /**
     * Bill form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.published = state === 'public';
      value.publishState = state;

      if (this._mode === 'creating') {

        const { documents, County, signature, myFile } = this._billUpload;
        const formData = new FormData();

        formData.append('documents', documents)
        formData.append('County', County)
        formData.append('signature', signature)
        formData.append('myFile', myFile)

        this.apiService.upload(formData).subscribe((result) => {
          value.billSignature = new Date().toISOString();
          value.uploaded = true;
          value.uploadedBillURL = result.location;

          this.billService.postBill(value).subscribe(() => subCallback(state));
        })
      } else {
        value.id = this._billId;

        this.billService.updateBill(value).subscribe(() => subCallback(state));
      }
    };

    // If 'Publish' is clicked
    if (published) {
      // Caching and callback handling
      this.cacheService.cache<FormGroup, 'public' | 'private' | 'draft'>(
        'GENERATE_BILL',
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
          id: 'GENERATE_BILL',
        },
      });
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
