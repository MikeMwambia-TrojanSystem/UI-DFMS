import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { take } from 'rxjs/operators';

import { CachedCallback, CacheService } from 'src/app/services/cache.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Department } from 'src/app/shared/types/department';
import { Personnel } from 'src/app/shared/types/personnel';
import { Upload } from 'src/app/shared/types/upload';
import { PhoneVerification } from 'src/app/shared/types/verification';
import { phoneNumberValidator } from '../../../shared/validators/phone-number';

type Cache = {
  form: FormGroup;
  filename: string;
  verification?: PhoneVerification;
};

@Component({
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _personnelId: string;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    group: new FormControl('drafter', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      phoneNumberValidator,
    ]),
    dateCreated: new FormControl(''),
    assemblyId: new FormControl(
      '60224665fd0c8e1b11fa85d5',
      Validators.required
    ),
    profilePic: new FormControl('', Validators.required),
    termOfService: new FormControl('', Validators.required),
    signature: new FormControl(''),
    status: new FormControl(false),
    verified: new FormControl(false),
    educationLevel: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    extraQualification: new FormControl('', Validators.required),
    deparment: new FormControl('', Validators.required),
    deptId: new FormControl('', Validators.required),
    published: new FormControl(false),
    publishState: new FormControl('draft'),
  });

  filename: string;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private personnelService: PersonnelService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate personnel data from resolver using param id
    const personnelId = this.route.snapshot.params.id;
    if (personnelId) {
      this._mode = 'editing';
      this._personnelId = personnelId;

      this.route.data
        .pipe(take(1))
        .subscribe(
          ({
            personnel,
            departments,
          }: {
            personnel: Personnel;
            departments: Department[];
          }) => {
            const { profilePic, department, ...others } = personnel;

            this.form.patchValue({
              ...others,
              profilePic: profilePic,
              deparment: department,
              deptId: departments.find((d) => d.name === department)._id,
            });

            const index = profilePic.lastIndexOf('amazonaws.com/') + 14;

            this.filename = profilePic.substring(index);
          }
        );
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<Cache>('CREATE_PERSONNEL');

    if (cached) {
      const { form, filename } = cached;

      this.form = form;
      this.filename = filename;
    }
  }

  get department(): string {
    return this.form.value.deparment as string;
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<Cache, T>,
    additionalData?: Record<string, any>
  ) {
    this.cacheService.cacheFunc<Cache, T>({
      id: 'CREATE_PERSONNEL',
      cacheId: this._cacheId,
      urlParamer: this._personnelId,
      returnUrl: '/create/employee',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: { form: this.form, filename: this.filename, ...additionalData },
      callback,
    })();
  }

  /**
   * This function get called when 'Upload Profile Picture' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'personnel',
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

  /**
   * This function get called when 'Select Department' button is clicked.
   * Caching the form and then redirect the user to '/list/department?select=true'.
   * After the user had selected the department, a callback function will get called and update the cached data with the selected information.
   */
  onSelectDepartment() {
    this._onCache<Department>(
      { url: '/list/department' },
      ({ form, filename }, { _id, name }) => {
        form.patchValue({
          deparment: name,
          deptId: _id,
        }); // Patch cached form with new department information.

        return { form, filename };
      }
    );
  }

  /**
   * This function get called when 'Publish' or 'Save as Draft' buttons is clicked.
   */
  onSave(status: boolean) {
    // Subcription callback
    const subCallback = ({ personnelId, request_id }: any) => {
      this.cacheService.clearCache('CREATE_PERSONNEL');

      if (request_id) {
        this.router.navigate(['/verification/personnel'], {
          queryParams: {
            userId: personnelId,
            request_id,
            state: status ? 'published' : 'draft',
          },
        });
      } else {
        this.router.navigate(['/list/personnel'], {
          queryParams: {
            state: status ? 'published' : 'draft',
          },
        });
      }
    };

    const value = this.form.value;

    value.publishState = status ? 'published' : 'draft';

    if (this._mode === 'creating') {
      value.dateCreated = moment().unix();
      value.signature = moment().unix();

      this.personnelService.postPersonnel(value).subscribe(subCallback);
    } else {
      value.id = this._personnelId;

      this.personnelService.updatePersonnel(value).subscribe(subCallback);
    }
  }
}
