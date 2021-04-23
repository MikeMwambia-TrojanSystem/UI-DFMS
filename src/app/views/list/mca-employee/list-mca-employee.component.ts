import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';
import moment from 'moment';

import { CacheService } from 'src/app/services/cache.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { McaEmployeeService } from 'src/app/services/mca-employee.service';

@Component({
  selector: 'app-list-mca-employee',
  templateUrl: './list-mca-employee.component.html',
  styleUrls: ['./list-mca-employee.component.scss'],
})
export class ListMcaEmployeeComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'published';
  private _mcaEmployees: McaEmployee[] = [];
  mcaEmployees: McaEmployee[] = [];
  selectable = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router,
    private mcaEmployeeService: McaEmployeeService
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Mca-Employees data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ mcaEmployees }: { mcaEmployees: McaEmployee[] }) => {
        const ordered = _.orderBy(mcaEmployees, 'dateCreated', 'desc');
        this._mcaEmployees = ordered;
        this.mcaEmployees = ordered;
      });
  }

  onSelect({ _id, name }: McaEmployee): void {
    if (this._cacheId) {
      this.cacheService.emit(this._cacheId, {
        _id,
        name,
      });
    }
  }

  onCreateNewMca() {
    this.cacheService.cache(
      'LIST_NEW_MCA',
      null,
      this.router.createUrlTree(['/list/mca-employee'], {
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

    this.router.navigate(['/create/mca'], {
      queryParams: {
        id: 'LIST_NEW_MCA',
      },
    });
  }

  // This function get called when the 'Delete' button is clicked
  onDelete(id: string) {
    this.mcaEmployeeService.deleteMca(id).subscribe(() => {
      window.location.reload();
    });
  }

  onApprove({ termOfService, _id, ...others }: McaEmployee) {
    const [termStart, termEnd] = termOfService.split(' to ');

    this.mcaEmployeeService
      .updateMca({
        ...others,
        termStart: moment(termStart, 'Do MMMM YYYY')
          .toJSON()
          .slice(termStart.indexOf('T') - 10, termStart.indexOf('T')),
        termEnd: moment(termEnd, 'Do MMMM YYYY')
          .toJSON()
          .slice(termEnd.indexOf('T') - 10, termEnd.indexOf('T')),
        published: true,
        id: _id,
      } as any)
      .subscribe(({ _mcaId, request_id }: any) => {
        this.router.navigate(['/verification/mca'], {
          queryParams: {
            userId: _mcaId,
            request_id,
            state: 'published',
          },
        });
      });
  }

  onSearch(query: string) {
    this.mcaEmployees = this._mcaEmployees.filter((i) =>
      _.lowerCase(i.name).includes(_.lowerCase(query))
    );
  }
}
