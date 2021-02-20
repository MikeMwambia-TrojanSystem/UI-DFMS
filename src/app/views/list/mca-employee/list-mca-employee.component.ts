import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';

@Component({
  selector: 'app-list-mca-employee',
  templateUrl: './list-mca-employee.component.html',
  styleUrls: ['./list-mca-employee.component.scss'],
})
export class ListMcaEmployeeComponent implements OnInit {
  mcaEmployees: McaEmployee[] = [];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Get selectable state from query url
    this.selectable = this.route.snapshot.queryParams.select || false;

    // Get Mca-Employees data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ mcaEmployees }: { mcaEmployees: McaEmployee[] }) => {
        this.mcaEmployees = _.orderBy(mcaEmployees, 'createdAt', 'desc');
      });
  }

  onSelect(employee: McaEmployee): void {
    this.cacheService.emit({ _id: employee._id, name: employee.name });
  }
}
