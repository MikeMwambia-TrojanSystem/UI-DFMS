import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import moment from 'moment'
import _ from 'lodash';

import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { PetitionService } from 'src/app/services/petition.service';
import { PetitionerService } from 'src/app/services/petitioner.service';
import { Petition } from 'src/app/shared/types/petition';
import { UploadPost } from 'src/app/shared/types/upload';

@Component({
  selector: 'app-petition-generate',
  templateUrl: './petition-generate.component.html',
  styleUrls: ['./petition-generate.component.scss'],
})
export class PetitionGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _petitionId: string;
  private _petitionUpload: UploadPost;
  form = new FormGroup({
    petitionSignature: new FormControl(''),
    content: new FormControl('', Validators.required),
    sponsorName: new FormControl('', Validators.required),
    department: new FormControl('test department'),
    relatedTo: new FormControl('', Validators.required),
    orderPaperId: new FormControl('12345'),
    assemblyId: new FormControl('12345'),
    datePublished: new FormControl(''),
    published: new FormControl(false),
    sponsorId: new FormControl('', Validators.required),
    approverId: new FormControl('12345'),
    petitionTitle: new FormControl(new Date().toISOString()),
    account: new FormControl('Speaker'),
    concernedCommitee: new FormControl('', Validators.required),
    concernedCommiteeId: new FormControl('', Validators.required),
    dateCommitteResponse: new FormControl('', Validators.required),
    datePresented: new FormControl('', Validators.required),
    dateToBDiscussed: new FormControl('', Validators.required),
    petitioners: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedFileURL: new FormControl(''),
    uploader: new FormControl('test uploader'),
    uploaderId: new FormControl('12345'),
    petitionNumber: new FormControl('', Validators.required),
  });

  hasUploaded = false;
  petitionersName: { name: string; _id: string }[] = [];

  constructor(private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private petitionService: PetitionService,
    private apiService: ApiService,
    private petitionerService: PetitionerService) { }

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate petition data from resolver using param id
    const petitionId = this.route.snapshot.params.id;
    if (petitionId) {
      this._mode = 'editing';
      this._petitionId = petitionId;
      this.hasUploaded = true;

      this.route.data
        .pipe(take(1))
        .subscribe(({ petition }: { petition: Petition }) => {
          const { approvingAccount, concernedCommitee, dateCommitteResponse, datePresented, dateToBDiscussed, petitioners, sponsoredBy, uploadingAccount, ...others } = petition;

          this.form.patchValue({
            ...others,
            sponsorName: sponsoredBy.sponsorName,
            sponsorId: sponsoredBy.sponsorId,
            approverId: approvingAccount.approverId,
            account: approvingAccount.account,
            concernedCommitee: concernedCommitee.name,
            concernedCommiteeId: concernedCommitee.id,
            dateCommitteResponse: moment(dateCommitteResponse).toJSON().slice(0, 10),
            datePresented: moment(datePresented).toJSON().slice(0, 10),
            dateToBDiscussed: moment(dateToBDiscussed).toJSON().slice(0, 10),
            petitioners: _.join(petitioners, '&&&'),
            uploader: uploadingAccount.name,
            uploaderId: uploadingAccount.id,
          })
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<{ form: FormGroup, upload: UploadPost }>('GENERATE_PETITION');

    if (cached) {
      const { form, upload } = cached;
      this.form = form;
      this._petitionUpload = upload;

      if (upload) {
        this.hasUploaded = true
      }
    }
    // Update petitioners name from form ids
    this.updatePetitionersList();
  }

  get committeeName(): string {
    return this.form.value.concernedCommitee;
  }

  get sponsorName(): string {
    return this.form.value.sponsorName;
  }

  get petitioners(): string {
    return this.form.value.petitioners;
  }

  get fileName(): string {
    try {
      return this._petitionUpload.myFile.name;
    } catch (error) {
      return undefined;
    }
  }

  async updatePetitionersList() {
    const names: { name: string; _id: string }[] = [];
    const petitioners = (this.form.value.petitioners as string).split('&&&');

    for (const petitionerId of petitioners) {
      if (petitionerId.length) {
        const name = await this.petitionerService
          .getPetitioner(petitionerId)
          .pipe(
            take(1),
            map((p) => p.name)
          )
          .toPromise();

        names.push({
          name,
          _id: petitionerId,
        });
      }
    }

    this.petitionersName = [...names];
  }

  /**
   * This function get called when 'Select Concerned Committee' button is clicked.
   * Caching the form and then redirect the user to '/list/committee?select=true'.
   * After the user had selected the committee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectCommittee() {
    // Caching and select callback handling
    const urlTree = this._petitionId
      ? ['/generate/petition', this._petitionId]
      : ['/generate/petition'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, { name: string; _id: string }>(
      'GENERATE_PETITION',
      { form: this.form, upload: this._petitionUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { name, _id }) => {
        form.patchValue({
          concernedCommitee: name,
          concernedCommiteeId: _id,
        }); // Patch form with selected committee

        return { form, upload };
      }
    );

    // Navigate the user to '/list/committee?select=true'
    this.router.navigate(['/list/committee'], {
      queryParams: {
        select: true,
        id: 'GENERATE_PETITION',
      },
    });
  }

  /**
   * This function get called when 'Sponsored By' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the sponsor, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSponsored() {
    // Caching and select callback handling
    const urlTree = this._petitionId
      ? ['/generate/petition', this._petitionId]
      : ['/generate/petition'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, { name: string; _id: string }>(
      'GENERATE_PETITION',
      { form: this.form, upload: this._petitionUpload },
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
        id: 'GENERATE_PETITION',
      },
    });
  }

  /**
   * This function get called when 'Add Petitioner' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the petitioner, a callback function will get called and update the cached data with the selected information.
   */
  onAddPetitioner() {
    // Caching and select callback handling
    const urlTree = this._petitionId
      ? ['/generate/petition', this._petitionId]
      : ['/generate/petition'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, { name: string, _id: string }>(
      'GENERATE_PETITION',
      { form: this.form, upload: this._petitionUpload },
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      ({ form, upload }, { _id }) => {
        let petitioners = form.value.petitioners as string;

        petitioners = petitioners.replace(_id, '');
        petitioners = petitioners.replace(`&&&&&&`, '&&&');

        if (petitioners.charAt(0) === '&&&') {
          petitioners = petitioners.substring(3)
        }

        form.patchValue({
          petitioners: petitioners.length ? (petitioners + '&&&' + _id) : _id,
        })

        return { form, upload };
      }
    );

    // Navigate the user to '/list/mca-employee?select=true'
    this.router.navigate(['/management/petitioners'], {
      queryParams: {
        select: true,
        id: 'GENERATE_PETITION',
      },
    });
  }

  /**
   * This function get called when 'Upload Soft copy of the petition' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    // Caching and select callback handling
    const urlTree = this._petitionId
      ? ['/generate/petition', this._petitionId]
      : ['/generate/petition'];
    this.cacheService.cache<{ form: FormGroup, upload: UploadPost }, UploadPost>(
      'GENERATE_PETITION',
      { form: this.form, upload: this._petitionUpload },
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
        id: 'GENERATE_PETITION',
        category: 'petition'
      },
    });
  }

  // This function get called when the 'Delete' button at petitioner list is clicked
  onPetitionerDelete(petitionerId: string) {
    let petitioners = this.form
      .value.petitioners as string;

    petitioners = petitioners.replace(petitionerId, '');
    petitioners = petitioners.replace(`&&&&&&`, '&&&');

    if (petitioners.charAt(0) === '&&&') {
      petitioners = petitioners.substring(1)
    }

    this.form.patchValue({
      petitioners: petitioners
    })

    const index = this.petitionersName.findIndex(
      (member) => member._id === petitionerId
    );
    this.petitionersName.splice(index, 1);
  }

  /**
   * This function get called when 'Publish' or 'Save as Draft' buttons is clicked.
   *
   * If the 'Publsh' button is clicked, caching the form and then redirect the user to '/publish-status'.
   * After the user had selected the publish status, a callback function will get called and a post request will be sent to the backend.
   *
   * If the 'Save as Draft' button is clicked, a post request will be sent to the backend.
   *
   * Afterwards, redirect user to /list/petition with the state depending on the user selected state.
   */
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/petition'], {
          queryParams: {
            state: state,
          },
        });
      }
    }

    /**
     * Petition form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.published = state === 'public';
      value.publishState = state;

      if (this._mode === 'creating') {

        const { documents, County, signature, myFile } = this._petitionUpload;
        const formData = new FormData();

        formData.append('documents', documents)
        formData.append('County', County)
        formData.append('signature', signature)
        formData.append('myFile', myFile)

        this.apiService.upload(formData).subscribe((result) => {
          value.datePublished = new Date().toISOString();
          value.petitionSignature = new Date().toISOString();
          value.uploaded = true;
          value.uploadedFileURL = result.location;

          this.petitionService.postPetition(value).subscribe(() => subCallback(state));
        })
      } else {
        value.id = this._petitionId;

        this.petitionService.updatePetition(value).subscribe(() => subCallback(state));
      }
    };

    // If 'Publish' is clicked
    if (published) {
      // Caching and callback handling
      this.cacheService.cache<FormGroup, 'public' | 'private' | 'draft'>(
        'GENERATE_MOTION',
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
          id: 'GENERATE_MOTION',
        },
      });
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
