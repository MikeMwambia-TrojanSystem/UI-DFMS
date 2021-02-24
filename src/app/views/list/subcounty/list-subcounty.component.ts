import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { SubCounty } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  templateUrl: './list-subcounty.component.html',
  styleUrls: ['./list-subcounty.component.scss'],
})
export class ListSubcountyComponent implements OnInit {
  private _cacheId: string;
  subCounties: SubCounty[] = [];
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

    // Get Subcounties data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ subCounties }: { subCounties: SubCounty[] }) => {
        this.subCounties = _.orderBy(subCounties, 'createdAt', 'desc');
      });
  }

  onSelect({ name, _id }: SubCounty): void {
    if (this._cacheId) {
      this.cacheService.emit(this._cacheId, { _id, name });
    }
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_SUBCOUNTY',
      null,
      this.router.createUrlTree(['/list/subcounty'], {
        queryParams: { select: this.selectable, id: this._cacheId },
      }),
      () => {
        return null;
      }
    );

    this.router.navigate(['/create/subcounty'], {
      queryParams: {
        id: 'LIST_NEW_SUBCOUNTY',
      },
    });
  }
}
