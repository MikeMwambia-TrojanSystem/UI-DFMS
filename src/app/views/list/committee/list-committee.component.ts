import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { Committee } from 'src/app/shared/types/committee';
import { CommitteeService } from 'src/app/services/committee.service';

@Component({
  selector: 'app-list-committee',
  templateUrl: './list-committee.component.html',
  styleUrls: ['./list-committee.component.scss'],
})
export class ListCommitteeComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'published';
  committees: Committee[];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private committeeService: CommitteeService
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Commitees data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ committees }: { committees: Committee[] }) => {
        this.committees = _.orderBy(committees, 'createdAt', 'desc');
      });
  }

  onSelect({ _id }: Committee) {
    if (this._cacheId) {
      this.cacheService.emit(this._cacheId, { _id });
    }
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_COMMITTEE',
      null,
      this.router.createUrlTree(['/list/committee'], {
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

    this.router.navigate(['/create/committee'], {
      queryParams: {
        id: 'LIST_NEW_COMMITTEE',
      },
    });
  }

  onDelete(id: string) {
    this.committeeService.deleteCommittee(id).subscribe(() => {
      window.location.reload();
    });
  }
}
