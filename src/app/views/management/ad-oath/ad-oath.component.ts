import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';
import { CachedCallback, CacheService } from 'src/app/services/cache.service';
import { Upload } from 'src/app/shared/types/upload';
import { Ward } from 'src/app/shared/types/ward-con-sub';

export interface Administration {
  name: string;
  ward: string;
  passport: string;
  politicalParty: string;
}

type Cache = {
  form: FormGroup;
  administrations: Administration[];
};

const CACHE_ID = 'MANAGEMENT_OATH';

@Component({
  selector: 'app-ad-oath',
  templateUrl: './ad-oath.component.html',
  styleUrls: ['./ad-oath.component.scss'],
})
export class AdministrationOathComponent implements OnInit {
  private _cacheId: string;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    ward: new FormControl('', Validators.required),
    passport: new FormControl('', Validators.required),
    politicalParty: new FormControl('', Validators.required),
  }); // Form group that holds user input

  administrations: Administration[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  get fileName(): string {
    const url = this.form.value.passport as string;
    return url.substring(url.lastIndexOf('amazonaws.com/') + 14);
  }

  get wardName(): string {
    return this.form.value.ward;
  }

  ngOnInit(): void {
    // Get info from url query
    this._cacheId = this.route.snapshot.queryParams.id;

    // Get cached data
    const cached = this.cacheService.rehydrate<Cache>(CACHE_ID);

    if (cached) {
      this.form.patchValue({
        ...cached.form.value,
      });

      this.administrations = cached.administrations;
    }
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<Cache, T>
  ) {
    this.cacheService.cacheFunc<Cache, T>({
      id: CACHE_ID,
      cacheId: this._cacheId,
      urlParamer: '',
      returnUrl: '/management/oath',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: { form: this.form, administrations: this.administrations },
      callback,
    })();
  }

  onUpload() {
    this._onCache<{ result: Upload }>(
      {
        url: '/management/upload',
        queryParams: {
          select: undefined,
          category: 'oath',
        },
      },
      (cached, { result }) => {
        cached.form.patchValue({
          passport: result.location,
        });

        return cached;
      }
    );
  }

  onWardSelect() {
    this._onCache<Ward>({ url: '/list/wards' }, (cached, { name }) => {
      cached.form.patchValue({
        ward: name,
      });
      return cached;
    });
  }

  onSave() {
    const ad = this.form.value as Administration;

    this.administrations.push(ad);
    this.form.reset({
      name: '',
      ward: '',
      passport: '',
      politicalParty: '',
    });
  }

  onSelect(ad: Administration) {
    this.cacheService.emit(this._cacheId, ad);
  }
}
