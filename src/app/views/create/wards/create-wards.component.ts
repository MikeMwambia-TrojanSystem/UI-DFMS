import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { Ward } from 'src/app/shared/types/ward-con-sub';

@Component({
  selector: 'app-create-wards',
  templateUrl: './create-wards.component.html',
  styleUrls: ['./create-wards.component.scss'],
})
export class CreateWardsComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'creating' | 'editing';
  private _wardId: string;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    constituency: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    type: new FormControl('ward', Validators.required),
    assemblyId: new FormControl('2d7cc79s2af', Validators.required),
    date: new FormControl(''),
  });
  county = 'Meru'; // Dynamic county name

  constructor(
    private wardConSubService: WardConSubService,
    private router: Router,
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Rehydrate the cached form data if there's any
    const cachedForm = this.cacheService.rehydrate<FormGroup>('CREATE_WARD');

    if (cachedForm) {
      this.form = cachedForm;
    }

    // Populate ward data from resolver using param id
    const wardId = this.route.snapshot.params.id;

    if (wardId) {
      this._mode = 'editing';
      this._wardId = wardId;

      this.route.data.pipe(take(1)).subscribe(({ ward }: { ward: Ward }) => {
        this.form.patchValue({
          ...ward,
        });
      });
    } else {
      this._mode = 'creating';
    }

    // Get cached id from query url
    this._cacheId = this.route.snapshot.queryParams.id;
  }

  /**
   * This function get called when 'Save' button is clicked.
   * Post the ward form data to backend.
   */
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = () => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/wards'], {
          queryParams: {
            state: published ? 'published' : 'draft',
          },
        });
      }
    };

    const value = this.form.value;

    value.published = published;

    if (this._mode === 'creating') {
      value.date = new Date().toISOString();

      this.wardConSubService
        .postWardConSub(value, 'ward')
        .subscribe(subCallback);
    } else {
      value.id = this._wardId;

      this.wardConSubService
        .updateWardConSub(value, 'ward')
        .subscribe(subCallback);
    }
  }

  /**
   * This function get called when 'Select Constituency' button is clicked.
   * Caching the form and then redirect the user to '/list/constituency?select=true'.
   * After the user had selected the constituency, a callback function will get called and update the cached data with the selected information.
   */
  onSelectConstituency() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'CREATE_WARD',
      this.form,
      this.router.createUrlTree(['/create/wards', this._wardId], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (form, { name, _id }) => {
        form.patchValue({
          constituency: name,
        }); // Patch form with selected constituency

        return form;
      }
    );

    // Navigate the user to '/list/constituency?select=true'
    this.router.navigate(['/list/constituency'], {
      queryParams: {
        select: true,
        id: 'CREATE_WARD',
      },
    });
  }

  /**
   * This function get called when 'Select Sub County' button is clicked.
   * Caching the form and then redirect the user to '/list/subcounty?select=true'.
   * After the user had selected the subcounty, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSubCounty() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'CREATE_WARD',
      this.form,
      this.router.createUrlTree(['/create/wards', this._wardId], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (form, { name, _id }) => {
        form.patchValue({
          subCounty: name,
        }); // Patch form with selected subcounty

        return form;
      }
    );

    // Navigate the user to '/list/subcounty?select=true'
    this.router.navigate(['/list/subcounty'], {
      queryParams: {
        select: true,
        id: 'CREATE_WARD',
      },
    });
  }
}
