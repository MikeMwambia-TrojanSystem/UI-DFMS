import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import {
  Constituency,
  WardConSubPost,
} from 'src/app/shared/types/ward-con-sub';

@Component({
  selector: 'app-create-constituencies',
  templateUrl: './create-constituencies.component.html',
  styleUrls: ['./create-constituencies.component.scss'],
})
export class CreateConstituenciesComponent implements OnInit {
  private _cacheId: string;
  private _constituencyId: string;
  private _mode: string;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    type: new FormControl('constituency', Validators.required),
    assemblyId: new FormControl('2d7c88e7a78c', Validators.required),
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;

  constructor(
    private wardConSubService: WardConSubService,
    private router: Router,
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Populate constituency data from resolver using param id
    const constituencyId = this.route.snapshot.params.id;

    if (constituencyId) {
      this._mode = 'editing';
      this._constituencyId = constituencyId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ constituency }: { constituency: Constituency }) => {
          this.form.patchValue({
            ...constituency,
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate from cached data if there's any
    const cachedForm = this.cacheService.rehydrate<FormGroup>(
      'CREATE_CONSTITUENCY'
    );

    if (cachedForm) {
      this.form = cachedForm;
    }

    // Get cached id from query url
    this._cacheId = this.route.snapshot.queryParams.id;
  }

  /**
   * This function get called when 'Save' button is clicked.
   * Post the constituency form data to backend.
   */
  onSave(published: boolean) {
    // Subcription callback
    const subCallback = () => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/constituency'], {
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
        .postWardConSub(value, 'constituency')
        .subscribe(subCallback);
    } else {
      value.id = this._constituencyId;

      this.wardConSubService
        .updateWardConSub<Constituency, WardConSubPost>(value, 'constituency')
        .subscribe(subCallback);
    }
  }

  /**
   * This function get called when 'Select SubCounty' button is clicked.
   * Caching the form and then redirect the user to '/list/subcounty?select=true'.
   * After the user had selected the subcounty, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSubCounty() {
    // Caching and select callback handling
    const urlTree = this._constituencyId
      ? ['/create/constituencies', this._constituencyId]
      : ['/create/constituencies'];
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'CREATE_CONSTITUENCY',
      this.form,
      this.router.createUrlTree(urlTree, {
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
        id: 'CREATE_CONSTITUENCY',
        state: 'published',
      },
    });
  }
}
