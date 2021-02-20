import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { Ward } from 'src/app/shared/types/ward-con-sub';

@Component({
  selector: 'app-list-wards',
  templateUrl: './list-wards.component.html',
  styleUrls: ['./list-wards.component.scss'],
})
export class ListWardsComponent implements OnInit {
  wards: Ward[] = [];
  selectable = false; // Whether the list is selectable

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get selectable state from url query
    this.selectable = this.route.snapshot.queryParams.select || false;

    // Get Wards data from resolver
    this.route.data.pipe(take(1)).subscribe(({ wards }: { wards: Ward[] }) => {
      this.wards = _.orderBy(wards, 'createdAt', 'desc');
    });
  }
}
