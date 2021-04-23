import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';
import { Ward } from 'src/app/shared/types/ward-con-sub';

@Component({
  templateUrl: './ward-view.component.html',
  styleUrls: ['./ward-view.component.scss'],
})
export class WardViewComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '', disabled: true }],
    constituency: [{ value: '', disabled: true }],
    subCounty: [{ value: '', disabled: true }],
    type: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    date: [{ value: '', disabled: true }],
  });
  county = 'Meru'; // Dynamic county name
  authorName: string;

  constructor(
    private fb: FormBuilder,
    private wardConSubService: WardConSubService,
    private router: Router,
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe(({ ward }: { ward: Ward }) => {
      this.form.patchValue({
        ...ward,
      });

      this.authorName = ward.authorName;
    });
  }
}
