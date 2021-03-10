import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Personnel } from 'src/app/shared/types/personnel';

@Component({
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss'],
})
export class ListPersonnelComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  personnels: Personnel[];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Personnels data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ personnels }: { personnels: Personnel[] }) => {
        this.personnels = _.orderBy(personnels, 'createdAt', 'desc');
      });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_PERSONNEL',
      null,
      this.router.createUrlTree(['/list/personnel'], {
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

    this.router.navigate(['/create/employee'], {
      queryParams: {
        id: 'LIST_NEW_PERSONNEL',
      },
    });
  }

  onDelete(id: string) {
    this.personnelService.deletePersonnel(id).subscribe(() => {
      window.location.reload();
    });
  }

  onSelect(personnel: Personnel) {
    this.cacheService.emit(this._cacheId, personnel);
  }
}
