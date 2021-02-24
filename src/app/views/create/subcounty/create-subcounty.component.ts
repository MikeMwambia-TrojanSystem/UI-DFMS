import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { SubCounty } from 'src/app/shared/types/ward-con-sub';

@Component({
  selector: 'app-create-subcounty',
  templateUrl: './create-subcounty.component.html',
  styleUrls: ['./create-subcounty.component.scss'],
})
export class CreateSubcountyComponent implements OnInit {
  private _cacheId: string;
  private _subcountyId: string;
  private _mode: 'creating' | 'editing';
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('subcounty', Validators.required),
    assemblyId: new FormControl('2d7c82a9c', Validators.required),
  });

  constructor(
    private wardConSubService: WardConSubService,
    private router: Router,
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Rehydrate the cached form data if there's any
    const cachedForm = this.cacheService.rehydrate<FormGroup>(
      'CREATE_SUBCOUNTY'
    );

    if (cachedForm) {
      this.form = cachedForm;
    }

    // Populate subcounty data from resolver using param id
    const subcountyId = this.route.snapshot.params.id;

    if (subcountyId) {
      this._mode = 'editing';
      this._subcountyId = subcountyId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ subcounty }: { subcounty: SubCounty }) => {
          this.form.patchValue({
            ...subcounty,
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Get return url from query url
    this._cacheId = this.route.snapshot.queryParams.id;
  }

  /**
   * This function get called when 'Save' button is clicked.
   * Post the subcounty form data to backend.
   */
  onSave(published: boolean) {
    const value = this.form.value;
    value.published = published;

    if (this._mode === 'creating') {
      value.date = new Date().toISOString();

      this.wardConSubService
        .postWardConSub(value, 'subcounty')
        .subscribe(({ message }) => {
          if (this._cacheId) {
            this.cacheService.emit(this._cacheId, null);
          } else {
            this.router.navigate(['/list/subcounty'], {
              queryParams: {
                state: published ? 'published' : 'draft',
              },
            });
          }
        });
    }
  }
}
