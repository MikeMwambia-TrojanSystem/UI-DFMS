import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { Department } from 'src/app/shared/types/department';

@Component({
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss'],
})
export class ListDepartmentComponent implements OnInit {
  departments: Department[] = [];
  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit() {
    // Get selectable state from query url
    this.selectable = this.route.snapshot.queryParams.select || false;

    // Get departments data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ departments }: { departments: Department[] }) => {
        this.departments = _.orderBy(departments, 'createdAt', 'desc');
      });
  }

  onSelect(department: Department): void {
    this.cacheService.emit({ _id: department._id, name: department.name });
  }
}
