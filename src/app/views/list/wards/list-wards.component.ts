import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { Ward } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-list-wards',
  templateUrl: './list-wards.component.html',
  styleUrls: ['./list-wards.component.scss'],
})
export class ListWardsComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'published';
  wards: Ward[] = [];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, return url from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Wards data from resolver
    this.route.data.pipe(take(1)).subscribe(({ wards }: { wards: Ward[] }) => {
      this.wards = _.orderBy(wards, 'createdAt', 'desc');
    });
  }

  onSelect({ _id, name }: Ward) {
    this.cacheService.emit(this._cacheId, { _id, name });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_WARD',
      null,
      this.router.createUrlTree(['/list/wards'], {
        queryParams: {
          select: this.selectable,
          id: this._cacheId,
          state: this._state,
        },
      }),
      () => {
        return null;
      }
    );

    this.router.navigate(['/create/wards'], {
      queryParams: {
        id: 'LIST_NEW_WARD',
      },
    });
  }
}
