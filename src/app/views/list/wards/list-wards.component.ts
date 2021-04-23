import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { Ward } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';

@Component({
  selector: 'app-list-wards',
  templateUrl: './list-wards.component.html',
  styleUrls: ['./list-wards.component.scss'],
})
export class ListWardsComponent implements OnInit {
  private _cacheId: string;
  // private _state: 'draft' | 'published';
  private _wards: Ward[] = [];
  wards: Ward[] = [];
  state: 'draft' | 'published';
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private wardConSubService: WardConSubService
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, return url from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    // this._state = queryParams.state;
    this.state = queryParams.state;

    // Get Wards data from resolver
    this.route.data.pipe(take(1)).subscribe(({ wards }: { wards: Ward[] }) => {
      const ordered = _.orderBy(wards, 'createdAt', 'desc');
      this._wards = ordered;
      this.wards = ordered;
    });
  }

  onSelect(ward: Ward) {
    this.cacheService.emit(this._cacheId, ward);
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_WARD',
      null,
      this.router.createUrlTree(['/list/wards'], {
        queryParams: {
          select: this.selectable,
          id: this._cacheId,
          // state: this._state,
          state: this.state,
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

  onDelete(id: string) {
    this.wardConSubService.deleteWardConSub(id).subscribe(() => {
      window.location.reload();
    });
  }

  onApprove({ _id, ...others }: Ward) {
    this.wardConSubService
      .updateWardConSub(
        {
          ...others,
          published: true,
          id: _id,
        } as any,
        'ward'
      )
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.wards = this._wards.filter((i) =>
      _.lowerCase(i.name).includes(_.lowerCase(query))
    );
  }
}
