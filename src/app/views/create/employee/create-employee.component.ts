import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Department } from 'src/app/shared/types/department';
import { Personnel } from 'src/app/shared/types/personnel';
import { UploadPost } from 'src/app/shared/types/upload';
import { phoneNumberValidator } from '../../../shared/validators/phone-number';

@Component({
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _personnelId: string;
  private _personnelUpload: UploadPost;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    group: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    dateCreated: new FormControl(''),
    assemblyId: new FormControl(
      '60224665fd0c8e1b11fa85d5',
      Validators.required
    ),
    profilePic: new FormControl('', [
      Validators.required,
      phoneNumberValidator,
    ]),
    termOfService: new FormControl('', Validators.required),
    signature: new FormControl(''),
    status: new FormControl(false),
    verified: new FormControl(false),
    educationLevel: new FormControl('', Validators.required),
    deparment: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
  });

  departments: Department[];
  hasUploaded = false;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate department data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ departments }: { departments: Department[] }) => {
        this.departments = departments;
      });

    // Populate personnel data from resolver using param id
    const personnelId = this.route.snapshot.params.id;
    if (personnelId) {
      this._mode = 'editing';
      this._personnelId = personnelId;
      this.hasUploaded = true;

      this.route.data
        .pipe(take(1))
        .subscribe(({ personnel }: { personnel: Personnel }) => {
          const { department, phoneNumber, ...others } = personnel;

          this.form.patchValue({
            ...others,
            phoneNumber: phoneNumber.phoneNumber,
            deparment: department.name,
            departmentId: department.id,
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<{
      form: FormGroup;
      upload: UploadPost;
    }>('CREATE_PERSONNEL');

    if (cached) {
      const { form, upload } = cached;
      this.form = form;
      this._personnelUpload = upload;

      if (upload) {
        this.hasUploaded = true;
      }
    }
  }

  get department(): string {
    return this.form.value.deparment as string;
  }

  /**
   * This function get called when 'Upload Profile Picture' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    // Caching and select callback handling
    const urlTree = this._personnelId
      ? ['/create/employee', this._personnelId]
      : ['/create/employee'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      UploadPost
    >(
      'CREATE_PERSONNEL',
      { form: this.form, upload: this._personnelUpload },
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
        id: 'CREATE_PERSONNEL',
        category: 'personnel',
      },
    });
  }

  /**
   * This function get called when 'Select Department' button is clicked.
   * Caching the form and then redirect the user to '/list/department?select=true'.
   * After the user had selected the department, a callback function will get called and update the cached data with the selected information.
   */
  onSelectDepartment() {
    // Caching and select callback handling
    const urlTree = this._personnelId
      ? ['/create/employee', this._personnelId]
      : ['/create/employee'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      { _id: string; name: string }
    >(
      'CREATE_PERSONNEL',
      { form: this.form, upload: this._personnelUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { _id, name }) => {
        form.patchValue({
          deparment: name,
          departmentId: _id,
        }); // Patch cached form with new department information.

        return { form, upload };
      }
    );

    // Navigate the user to '/list/department?select=true'
    this.router.navigate(['/list/department'], {
      queryParams: { select: true, id: 'CREATE_PERSONNEL' },
    });
  }

  /**
   * This function get called when 'Publish' or 'Save as Draft' buttons is clicked.
   */
  onSave(status: boolean) {
    // Subcription callback
    const subCallback = () => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/personnel'], {
          queryParams: {
            state: status ? 'published' : 'draft',
          },
        });
      }
    };

    const value = this.form.value;

    value.status = status;

    if (this._mode === 'creating') {
      const { documents, County, signature, myFile } = this._personnelUpload;
      const formData = new FormData();

      formData.append('documents', documents);
      formData.append('County', County);
      formData.append('signature', signature);
      formData.append('myFile', myFile);

      this.apiService.upload(formData).subscribe((result) => {
        value.dateCreated = new Date().toISOString();
        value.signature = new Date().toISOString();
        value.profilePic = result.location;

        this.personnelService.postPersonnel(value).subscribe(subCallback);
      });
    } else {
      value.id = this._personnelId;

      this.personnelService.updatePersonnel(value).subscribe(subCallback);
    }
  }
}
