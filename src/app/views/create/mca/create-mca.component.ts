import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { CacheService } from 'src/app/services/cache.service';
import { McaEmployeeService } from 'src/app/services/mca-employee.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number';
import { ApiService } from 'src/app/services/api.service';
import { UploadPost } from 'src/app/shared/types/upload';

@Component({
  selector: 'app-create-mca',
  templateUrl: './create-mca.component.html',
  styleUrls: ['./create-mca.component.scss'],
})
export class CreateMcaComponent implements OnInit {
  private _mode: 'editing' | 'creating';
  private _mcaId: string;
  private _cacheId: string;
  private _mcaUpload: UploadPost;
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
    profilePic: new FormControl(''),
    signature: new FormControl('599595955959595', Validators.required),
    status: new FormControl(false),
    termStart: new FormControl('', Validators.required),
    termEnd: new FormControl('', Validators.required),
    termOfService: new FormControl(''),
    ward: new FormControl('', Validators.required),
    wardId: new FormControl('', Validators.required),
  });

  hasUploaded = false;

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private mcaEmployeeService: McaEmployeeService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

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
          const { phoneNumber, ward, termOfService, ...others } = mca;
          const [termStart, termEnd] = termOfService.split(' to ');

          this.form.patchValue({
            ...others,
            phoneNumber: phoneNumber.number,
            ward: ward.wardName,
            wardId: ward.wardId,
            termStart: moment(termStart, 'Do MMMM YYYY').toJSON().slice(0, 10),
            termEnd: moment(termEnd, 'Do MMMM YYYY').toJSON().slice(0, 10),
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate cached form data if there's any
    const cached = this.cacheService.rehydrate<{
      form: FormGroup;
      upload: UploadPost;
    }>('CREATE_MCA');

    if (cached) {
      const { form, upload } = cached;

      this.form = form;
      this._mcaUpload = upload;

      if (upload) {
        this.hasUploaded = true;
      }
    }
  }

  get ward(): string {
    return this.form.value.ward;
  }

  get profilePic(): string {
    try {
      return this._mcaUpload.myFile.name;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * This function get called when 'Select Ward Represented' button is clicked.
   * Caching the form and then redirect the user to '/list/wards?select=true'.
   * After the user had selected the ward, a callback function will get called and update the cached data with the selected information.
   */
  onWardSelect() {
    // Caching and select callback handling
    const urlTree = this._mcaId
      ? ['/create/mca', this._mcaId]
      : ['/create/mca'];
    this.cacheService.cache<{
      form: FormGroup;
      upload: UploadPost;
    }, { _id: string; name: string }>(
      'CREATE_MCA',
      {
        form: this.form,
        upload: this._mcaUpload,
      },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { _id, name }) => {
        form.patchValue({
          wardId: _id,
          ward: name,
        }); // Patch cached form with new ward information.

        return { form, upload };
      }
    );

    // Navigate the user to '/list/wards?select=true'
    this.router.navigate(['/list/wards'], {
      queryParams: { select: true, id: 'CREATE_MCA' },
    });
  }

  // This function is called when '' button is clicked
  /**
   * This function get called when 'Upload Profile Picture' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   */
  onProfileSelect() {
    // Caching and select callback handling
    const urlTree = this._mcaId
      ? ['/create/mca', this._mcaId]
      : ['/create/mca'];
    this.cacheService.cache<
      { form: FormGroup; upload: UploadPost },
      UploadPost
    >(
      'CREATE_MCA',
      { form: this.form, upload: this._mcaUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (data, uploadData) => ({
        ...data,
        upload: uploadData,
      })
    );

    // Navigate the user to '/management/upload'
    this.router.navigate(['/management/upload'], {
      queryParams: { id: 'CREATE_MCA', category: 'mca' },
    });
  }

  // This function is called when 'Save as Draft' or 'Save MCA' buttons are clicked
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = () => {
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
      const { documents, County, signature, myFile } = this._mcaUpload;
      const formData = new FormData();

      formData.append('documents', documents);
      formData.append('County', County);
      formData.append('signature', signature);
      formData.append('myFile', myFile);

      this.apiService.upload(formData).subscribe((result) => {
        value.dateCreated = new Date().toISOString();
        value.profilePic = result.location;

        this.mcaEmployeeService.postMca(value).subscribe(subCallback);
      });
    } else {
      value.id = this._mcaId;

      this.mcaEmployeeService.updateMca(value).subscribe(subCallback);
    }
  }
}
