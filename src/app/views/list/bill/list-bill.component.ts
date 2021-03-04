import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { BillService } from 'src/app/services/bill.service';
import { CacheService } from 'src/app/services/cache.service';
import { Bill } from 'src/app/shared/types/bill';

@Component({
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss'],
})
export class ListBillComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  bills: Bill[];
  selectable: boolean;

  constructor(private route: ActivatedRoute,
    private billService: BillService,
    private cacheService: CacheService,
    private router: Router) { }

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Petitions data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ bills }: { bills: Bill[] }) => {
        this.bills = _.orderBy(bills, 'createdAt', 'desc');
      });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_BILL',
      null,
      this.router.createUrlTree(['/list/bill'], {
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

    this.router.navigate(['/generate/bill'], {
      queryParams: {
        id: 'LIST_NEW_BILL',
      },
    });
  }

  onDelete(id: string) {
    this.billService.deleteBill(id).subscribe(() => {
      window.location.reload();
    })
  }
}
