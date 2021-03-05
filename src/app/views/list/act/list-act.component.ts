import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { ActService } from 'src/app/services/act.service';
import { CacheService } from 'src/app/services/cache.service';
import { Act } from 'src/app/shared/types/act';

@Component({
  templateUrl: './list-act.component.html',
  styleUrls: ['./list-act.component.scss'],
})
export class ListActComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  acts: Act[];
  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private actService: ActService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Acts data from resolver
    this.route.data.pipe(take(1)).subscribe(({ acts }: { acts: Act[] }) => {
      this.acts = _.orderBy(acts, 'createdAt', 'desc');
    });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_ACT',
      null,
      this.router.createUrlTree(['/list/act'], {
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

    this.router.navigate(['/generate/act'], {
      queryParams: {
        id: 'LIST_NEW_ACT',
      },
    });
  }

  onDelete(id: string) {
    this.actService.deleteAct(id).subscribe(() => {
      window.location.reload();
    });
  }

  onSelect({ titleOfAct, _id }: Act) {
    this.cacheService.emit(this._cacheId, { titleOfAct, _id });
  }
}
