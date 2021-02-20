import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { SubCounty } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  templateUrl: './list-subcounty.component.html',
  styleUrls: ['./list-subcounty.component.scss'],
})
export class ListSubcountyComponent implements OnInit {
  subCounties: SubCounty[] = [];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Get selectable state from query url
    this.selectable = this.route.snapshot.queryParams.select || false;

    // Get Subcounties data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ subCounties }: { subCounties: SubCounty[] }) => {
        this.subCounties = _.orderBy(subCounties, 'createdAt', 'desc');
      });
  }

  onSelect({ name, _id }: SubCounty): void {
    this.cacheService.emit({ _id, name });
  }
}
