import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import moment from 'moment';
import _ from 'lodash';

import { ApiService } from 'src/app/services/api.service';
import { CachedCallback, CacheService } from 'src/app/services/cache.service';
import { PetitionService } from 'src/app/services/petition.service';
import { Petition } from 'src/app/shared/types/petition';
import { Upload } from 'src/app/shared/types/upload';
import { Committee } from 'src/app/shared/types/committee';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-petition-generate',
  templateUrl: './petition-generate.component.html',
  styleUrls: ['./petition-generate.component.scss'],
})
export class PetitionGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'editing' | 'creating';
  private _petitionId: string;

  form = new FormGroup({
    petitionSignature: new FormControl(''),
    content: new FormControl('', Validators.required),
    sponsorName: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    relatedTo: new FormControl('', Validators.required),
    orderPaperId: new FormControl(''),
    assemblyId: new FormControl('60224665fd0c8e1b11fa85d5'),
    datePublished: new FormControl(''),
    published: new FormControl(false),
    sponsorId: new FormControl('', Validators.required),
    approverId: new FormControl(''),
    account: new FormControl(''),
    concernedCommitee: new FormControl('', Validators.required),
    concernedCommiteeId: new FormControl('', Validators.required),
    dateCommitteResponse: new FormControl('', Validators.required),
    datePresented: new FormControl('', Validators.required),
    dateToBDiscussed: new FormControl('', Validators.required),
    petitioners: new FormControl('', Validators.required),
    uploaded: new FormControl(false),
    uploadedFileURL: new FormControl('', Validators.required),
    uploader: new FormControl(''),
    uploaderId: new FormControl(''),
    petitionNumber: new FormControl('', Validators.required),
  });

  petitionersName: string[] = [];

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private petitionService: PetitionService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate petition data from resolver using param id
    const petitionId = this.route.snapshot.params.id;
    if (petitionId) {
      this._mode = 'editing';
      this._petitionId = petitionId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ petition }: { petition: Petition }) => {
          const {
            approvingAccount,
            concernedCommitee,
            dateCommitteResponse,
            datePresented,
            dateToBDiscussed,
            petitioners,
            sponsoredBy,
            uploadingAccount,
            ...others
          } = petition;

          this.form.patchValue({
            ...others,
            sponsorName: sponsoredBy.sponsorName,
            sponsorId: sponsoredBy.sponsorId,
            approverId: approvingAccount.approverId,
            account: approvingAccount.account,
            concernedCommitee: concernedCommitee.name,
            concernedCommiteeId: concernedCommitee.id,
            dateCommitteResponse: moment(dateCommitteResponse)
              .toJSON()
              .slice(0, 10),
            datePresented: moment(datePresented).toJSON().slice(0, 10),
            dateToBDiscussed: moment(dateToBDiscussed).toJSON().slice(0, 10),
            petitioners: petitioners.join('&&&'),
            uploader: uploadingAccount.name,
            uploaderId: uploadingAccount.id,
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<FormGroup>('GENERATE_PETITION');

    if (cached) {
      this.form = cached;
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
      const url = this.form.value.uploadedFileURL as string;
      return url.substring(url.lastIndexOf('amazonaws') + 14);
    } catch (error) {
      return undefined;
    }
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<FormGroup, T>
  ) {
    // Caching and select callback handling
    const urlTree = this._petitionId
      ? ['generate/petition', this._petitionId]
      : ['generate/petition'];

    this.cacheService.cache<FormGroup, T>(
      'GENERATE_PETITION',
      this.form,
      this.router.createUrlTree(urlTree, {
        queryParams: {
          id: this._cacheId,
        },
      }),
      callback
    );

    this.router.navigate([url], {
      queryParams: {
        id: 'GENERATE_PETITION',
        select: true,
        ...queryParams,
      },
    });
  }

  async updatePetitionersList() {
    let petitioners = (this.form.value.petitioners as string).split('&&&');

    petitioners = petitioners[0].length ? petitioners : [];

    for (const p of petitioners) {
      this.petitionersName.push(
        p.match(/(?<=name=).+?(?=\|\|\|)/g)
          ? p.match(/(?<=name=).+?(?=\|\|\|)/g)[0]
          : ''
      );
    }
  }

  /**
   * This function get called when 'Select Concerned Committee' button is clicked.
   * Caching the form and then redirect the user to '/list/committee?select=true'.
   * After the user had selected the committee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectCommittee() {
    this._onCache<Committee>(
      { url: '/list/committee' },
      (form, { name, _id, departmentInExcecutive }) => {
        form.patchValue({
          concernedCommitee: name,
          concernedCommiteeId: _id,
          department: departmentInExcecutive,
        }); // Patch form with selected committee

        return form;
      }
    );
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
   * This function get called when 'Add Petitioner' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the petitioner, a callback function will get called and update the cached data with the selected information.
   */
  onAddPetitioner() {
    this._onCache<string>(
      { url: '/management/petitioners' },
      (form, petitioners) => {
        form.patchValue({
          petitioners,
        });

        return form;
      }
    );
  }

  /**
   * This function get called when 'Upload Soft copy of the petition' button is clicked.
   * Caching the form and then redirect the user to '/management/upload'.
   * After the user had uploaded, a callback function will get called and update the cached data with the uploaded information.
   */
  onUpload() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'petition',
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

  // This function get called when the 'Delete' button at petitioner list is clicked
  onPetitionerDelete(index: number) {
    this.petitionersName.splice(index, 1);

    const newPetitioners = (this.form.value.petitioners as string).split('&&&');

    newPetitioners.splice(index, 1);

    this.form.patchValue({
      petitioners: newPetitioners.join('&&&'),
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
   * Afterwards, redirect user to /list/petition with the state depending on the user selected state.
   */
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      this.cacheService.clearCache('GENERATE_PETITION');

      this.router.navigate(['/list/petition'], {
        queryParams: {
          state: state,
        },
      });
    };

    /**
     * Petition form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.publishState = state;

      if (this._mode === 'creating') {
        value.datePublished = moment().toISOString();
        value.petitionSignature = moment().unix();
        value.uploader = this.accountService.user.username;
        value.uploaderId = this.accountService.user._id;
        value.account = this.accountService.user.username;

        this.petitionService
          .postPetition(value)
          .subscribe(() => subCallback(state));
      } else {
        value.id = this._petitionId;

        this.petitionService
          .updatePetition(value)
          .subscribe(() => subCallback(state));
      }
    };

    // If 'Publish' is clicked
    if (published) {
      // Caching and callback handling
      this.cacheService.cache<FormGroup, 'public' | 'private' | 'draft'>(
        'GENERATE_PETITION',
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
          id: 'GENERATE_PETITION',
        },
      });
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
