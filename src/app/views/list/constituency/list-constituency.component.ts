import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { Constituency } from 'src/app/shared/types/ward-con-sub';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  templateUrl: './list-constituency.component.html',
  styleUrls: ['./list-constituency.component.scss'],
})
export class ListConstituencyComponent implements OnInit {
  constituencies: Constituency[] = [];

  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Get selectable state from url query
    this.selectable = this.route.snapshot.queryParams.select || false;

    // Get Constituency data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ constituencies }: { constituencies: Constituency[] }) => {
        this.constituencies = _.orderBy(constituencies, 'createdAt', 'desc');
      });
  }

  onSelect({ name, _id }: Constituency) {
    this.cacheService.emit({ name, _id });
  }
}
