import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { Department } from 'src/app/shared/types/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss'],
})
export class ListDepartmentComponent implements OnInit {
  private _cacheId: string;
  // private _state: 'draft' | 'published';
  state: 'draft' | 'published';
  departments: Department[] = [];
  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    // this._state = queryParams.state;
    this.state = queryParams.state;

    // Get departments data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ departments }: { departments: Department[] }) => {
        this.departments = _.orderBy(departments, 'createdAt', 'desc');
      });
  }

  onSelect(department: Department): void {
    if (this._cacheId) {
      const selected = { _id: department._id, name: department.name };
      this.cacheService.emit(this._cacheId, selected);
    }
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_DEPARTMENT',
      null,
      this.router.createUrlTree(['/list/department'], {
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

    this.router.navigate(['/create/department'], {
      queryParams: {
        id: 'LIST_NEW_DEPARTMENT',
      },
    });
  }

  // This function get called when the 'Delete' button is clicked
  onDelete(id: string) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      window.location.reload();
    });
  }
}
