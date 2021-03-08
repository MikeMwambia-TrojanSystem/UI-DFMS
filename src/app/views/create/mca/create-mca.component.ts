import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { CachedCallback, CacheService } from 'src/app/services/cache.service';
import { McaEmployeeService } from 'src/app/services/mca-employee.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number';
import { ApiService } from 'src/app/services/api.service';
import { Upload, UploadPost } from 'src/app/shared/types/upload';
import { PhoneVerification } from 'src/app/shared/types/verification';

type Cache = {
  form: FormGroup;
  filename: string;
  verification?: PhoneVerification;
};

@Component({
  selector: 'app-create-mca',
  templateUrl: './create-mca.component.html',
  styleUrls: ['./create-mca.component.scss'],
})
export class CreateMcaComponent implements OnInit {
  private _mode: 'editing' | 'creating';
  private _mcaId: string;
  private _cacheId: string;

  form = new FormGroup({
    assemblyId: new FormControl(
      '603cbd73bd0107cf86d79170',
      Validators.required
    ),
    commiteesInvolved: new FormArray([]),
    dateCreated: new FormControl(''),
    group: new FormControl('MCA', Validators.required),
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      phoneNumberValidator,
    ]),
    politicalParty: new FormControl('', Validators.required),
    positionStatus: new FormControl('', Validators.required),
    profilePic: new FormControl('', Validators.required),
    signature: new FormControl(''),
    status: new FormControl(false),
    termStart: new FormControl('', Validators.required),
    termEnd: new FormControl('', Validators.required),
    termOfService: new FormControl(''),
    ward: new FormControl('', Validators.required),
    wardId: new FormControl('', Validators.required),
  });

  filename: string;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private mcaEmployeeService: McaEmployeeService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate mca data from resolver using param id
    const committeeId = this.route.snapshot.params.id;

    if (committeeId) {
      this._mode = 'editing';
      this._mcaId = committeeId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ mca }: { mca: McaEmployee }) => {
          const { termOfService, ...others } = mca;
          const [termStart, termEnd] = termOfService.split(' to ');

          this.form.patchValue({
            ...others,
            termStart: moment(termStart, 'Do MMMM YYYY').toJSON().slice(0, 10),
            termEnd: moment(termEnd, 'Do MMMM YYYY').toJSON().slice(0, 10),
          });

          const index = mca.profilePic.lastIndexOf('amazonaws.com/') + 14;

          this.filename = mca.profilePic.substring(index);
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate cached form data if there's any
    const cached = this.cacheService.rehydrate<Cache>('CREATE_MCA');

    if (cached) {
      const { form, filename } = cached;

      this.form = form;
      this.filename = filename;
    }
  }

  get ward(): string {
    return this.form.value.ward;
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<Cache, T>
  ) {
    this.cacheService.cacheFunc<Cache, T>({
      id: 'CREATE_MCA',
      cacheId: this._cacheId,
      urlParamer: this._mcaId,
      returnUrl: '/create/mca',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: { form: this.form, filename: this.filename },
      callback,
    })();
  }

  /**
   * This function get called when 'Select Ward Represented' button is clicked.
   * Caching the form and then redirect the user to '/list/wards?select=true'.
   * After the user had selected the ward, a callback function will get called and update the cached data with the selected information.
   */
  onWardSelect() {
    this._onCache(
      { url: '/list/wards' },
      ({ form, filename }, { _id, name }) => {
        form.patchValue({
          wardId: _id,
          ward: name,
        }); // Patch cached form with new ward information.

        return { form, filename };
      }
    );
  }

  // This function is called when '' button is clicked
  /**
   * This function get called when 'Upload Profile Picture' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   */
  onProfileSelect() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'mca',
        },
      },
      ({ form }, { result }) => {
        form.patchValue({
          profilePic: result.location,
        });

        return { form, filename: result.key };
      }
    );
  }

  // This function is called when 'Save as Draft' or 'Save MCA' buttons are clicked
  onSave(published: boolean) {
    // After POST
    const redirecting = () => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/mca-employee'], {
          queryParams: {
            state: published ? 'published' : 'draft',
          },
        });
      }
    };

    // Subcription callback
    const subCallback = ({ mcaId, request_id }: any) => {
      if (published === true) {
        this.cacheService.cache<
          Cache & { userId: string; request_id: string },
          boolean
        >(
          'CREATE_MCA',
          {
            form: this.form,
            filename: this.filename,
            userId: mcaId,
            request_id,
          },
          undefined,
          (data) => {
            redirecting();

            return data;
          }
        );

        this.router.navigate(['/verification/phone'], {
          queryParams: {
            id: 'CREATE_MCA',
          },
        });
      } else {
        redirecting();
      }
    };

    // Transform form termStart and termEnd values into a single termOfService string for API parameter.
    const transform = () => {
      const value = this.form.value;
      const termStart = moment(value.termStart).format('Do MMMM YYYY');
      const termEnd = moment(value.termEnd).format('Do MMMM YYYY');

      return `${termStart} to ${termEnd}`;
    };

    const value = this.form.value;

    value.status = published;
    value.termOfService = transform();

    if (this._mode === 'creating') {
      value.dateCreated = moment().toISOString();
      value.signature = moment().unix();

      this.mcaEmployeeService.postMca(value).subscribe(subCallback);
    } else {
      value.id = this._mcaId;

      this.mcaEmployeeService.updateMca(value).subscribe(subCallback);
    }
  }
}
