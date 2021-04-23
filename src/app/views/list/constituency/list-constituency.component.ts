import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { Constituency } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';

@Component({
  templateUrl: './list-constituency.component.html',
  styleUrls: ['./list-constituency.component.scss'],
})
export class ListConstituencyComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'published';
  private _constituencies: Constituency[] = [];
  constituencies: Constituency[] = [];
  state: 'draft' | 'published';

  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private wardConSubService: WardConSubService
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;
    this.state = queryParams.state;

    // Get Constituency data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ constituencies }: { constituencies: Constituency[] }) => {
        const ordered = _.orderBy(constituencies, 'createdAt', 'desc');
        this._constituencies = ordered;
        this.constituencies = ordered;
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
          state: this.state,
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

  // This function get called when the 'Delete' button is clicked
  onDelete(id: string) {
    this.wardConSubService.deleteWardConSub<Constituency>(id).subscribe(() => {
      window.location.reload();
    });
  }

  onApprove({ _id, ...others }: Constituency) {
    this.wardConSubService
      .updateWardConSub(
        {
          ...others,
          published: true,
          id: _id,
        } as any,
        'constituency'
      )
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.constituencies = this._constituencies.filter((i) =>
      _.lowerCase(i.name).includes(_.lowerCase(query))
    );
  }
}
