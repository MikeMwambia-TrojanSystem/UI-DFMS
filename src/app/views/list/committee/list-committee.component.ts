import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { Committee } from 'src/app/shared/types/committee';

@Component({
  selector: 'app-list-committee',
  templateUrl: './list-committee.component.html',
  styleUrls: ['./list-committee.component.scss'],
})
export class ListCommitteeComponent implements OnInit {
  committees: Committee[];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Get selectable state from query url
    this.selectable = this.route.snapshot.queryParams.select || false;

    // Get Commitees data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ committees }: { committees: Committee[] }) => {
        this.committees = _.orderBy(committees, 'createdAt', 'desc');
      });
  }

  onSelect({ _id }: Committee) {
    this.cacheService.emit({ _id });
  }
}
