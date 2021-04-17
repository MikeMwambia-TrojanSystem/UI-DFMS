import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { TentativeBusiness } from 'src/app/shared/types/tentative-business';

@Component({
  templateUrl: './list-tentative-business.component.html',
  styleUrls: ['./list-tentative-business.component.scss'],
})
export class ListTentativeBusinesssComponent implements OnInit {
  private _cacheId: string;
  tentativeBusinesses: TentativeBusiness[];

  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private tentativeBusinessService: TentativeBusinessService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select || false;
    this._cacheId = queryParams.id;

    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          tentativeBusinesses,
        }: {
          tentativeBusinesses: TentativeBusiness[];
        }) => {
          this.tentativeBusinesses = tentativeBusinesses;
        }
      );
  }

  onSelect(tentativeBusinesses: TentativeBusiness) {
    this.cacheService.emit(this._cacheId, tentativeBusinesses);
  }

  onDelete(tentativeBusinesses: TentativeBusiness) {
    this.tentativeBusinessService
      .deleteTentativeBusiness(tentativeBusinesses._id)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
