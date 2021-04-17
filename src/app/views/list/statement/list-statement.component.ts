import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';
import moment from 'moment';

import { CacheService } from 'src/app/services/cache.service';
import { StatementService } from 'src/app/services/statement.service';
import { Statement } from 'src/app/shared/types/statement';
import { StatementInfo } from 'src/app/components/StatementItem/statement-item.component';

@Component({
  templateUrl: './list-statement.component.html',
  styleUrls: ['./list-statement.component.scss'],
})
export class ListStatementComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  statements: any[];
  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private statementService: StatementService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Statement data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ statements }: { statements: any[] }) => {
        this.statements = _.orderBy(statements, 'datePublished', 'desc');
      });
  }

  getInfo({
    title,
    subjectOfStatement,
    seeker,
    departmentResponsible,
    datePublished,
  }: Statement): StatementInfo[] {
    return [
      {
        label: 'Statement No ',
        content: title.toString(),
        class: { common: 'head' },
      },
      {
        label: 'Subject of the Statement ',
        content: subjectOfStatement,
        class: { content: 'bold' },
      },
      { label: 'Sought by', content: seeker.name, class: { content: 'bold' } },
      {
        label: 'Responded By',
        content: departmentResponsible,
        class: { content: 'bold' },
      },
      {
        label: 'Date Responded',
        content: moment(datePublished).format('DD MMMM, YYYY'),
        class: {
          common: 'small',
          content: 'color bold',
        },
      },
    ];
  }

  onDelete(id: string) {
    this.statementService.deleteStatement(id).subscribe(() => {
      window.location.reload(); // Reload page when successfully deleting motion
    });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_STATEMENT',
      null,
      this.router.createUrlTree(['/list/statement'], {
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

    this.router.navigate(['/upload/statement'], {
      queryParams: {
        id: 'LIST_NEW_STATEMENT',
      },
    });
  }

  onSelect(statement: Statement) {
    this.cacheService.emit(this._cacheId, statement);
  }
}
