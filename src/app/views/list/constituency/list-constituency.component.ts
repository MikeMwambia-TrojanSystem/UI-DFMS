import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { Constituency } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  templateUrl: './list-constituency.component.html',
  styleUrls: ['./list-constituency.component.scss'],
})
export class ListConstituencyComponent implements OnInit {
  private _cacheId: string;
  private _state: string;
  constituencies: Constituency[] = [];

  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Constituency data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ constituencies }: { constituencies: Constituency[] }) => {
        this.constituencies = _.orderBy(constituencies, 'createdAt', 'desc');
      });
  }

  onSelect({ name, _id }: Constituency) {
    if (this._cacheId) {
      this.cacheService.emit(this._cacheId, { name, _id });
    }
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_CONSTITUENCY',
      null,
      this.router.createUrlTree(['/list/constituency'], {
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

    this.router.navigate(['/create/constituencies'], {
      queryParams: {
        id: 'LIST_NEW_CONSTITUENCY',
      },
    });
  }
}
