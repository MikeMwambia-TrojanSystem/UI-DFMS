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
  private _committees: Committee[];
  committees: Committee[];
  state: 'draft' | 'published';
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
    this.state = queryParams.state;

    // Get Commitees data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ committees }: { committees: Committee[] }) => {
        const ordered = _.orderBy(committees, 'createdAt', 'desc');
        this._committees = ordered;
        this.committees = ordered;
      });
  }

  onSelect(committee: Committee) {
    if (this._cacheId) {
      this.cacheService.emit(this._cacheId, committee);
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
          state: this.state,
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

  onApprove({
    committesMembers,
    _id,
    chair,
    viceChair,
    approvingAccount,
    ...others
  }: Committee) {
    this.committeeService
      .updateCommittee({
        ...others,
        Chairname: chair.name,
        chairId: chair.id,
        viceChair: viceChair.name,
        viceChairId: viceChair.id,
        approverId: approvingAccount.approverId,
        account: approvingAccount.account,
        committesMembers: committesMembers.join('&&&'),
        published: true,
        id: _id,
      } as any)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.committees = this._committees.filter((i) =>
      _.lowerCase(i.name).includes(_.lowerCase(query))
    );
  }
}
