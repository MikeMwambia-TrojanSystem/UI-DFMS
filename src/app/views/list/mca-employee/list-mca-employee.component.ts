import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { McaEmployeeService } from 'src/app/services/mca-employee.service';

@Component({
  selector: 'app-list-mca-employee',
  templateUrl: './list-mca-employee.component.html',
  styleUrls: ['./list-mca-employee.component.scss'],
})
export class ListMcaEmployeeComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'published';
  mcaEmployees: McaEmployee[] = [];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private mcaEmployeeService: McaEmployeeService
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Mca-Employees data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ mcaEmployees }: { mcaEmployees: McaEmployee[] }) => {
        this.mcaEmployees = _.orderBy(mcaEmployees, 'dateCreated', 'desc');
      });
  }

  onSelect({ _id, name }: McaEmployee): void {
    if (this._cacheId) {
      this.cacheService.emit(this._cacheId, {
        _id,
        name,
      });
    }
  }

  onCreateNewMca() {
    this.cacheService.cache(
      'LIST_NEW_MCA',
      null,
      this.router.createUrlTree(['/list/mca-employee'], {
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

    this.router.navigate(['/create/mca'], {
      queryParams: {
        id: 'LIST_NEW_MCA',
      },
    });
  }

  // This function get called when the 'Delete' button is clicked
  onDelete(id: string) {
    this.mcaEmployeeService.deleteMca(id).subscribe(() => {
      window.location.reload();
    });
  }
}
