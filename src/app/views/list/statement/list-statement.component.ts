import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { StatementService } from 'src/app/services/statement.service';
import { Statement } from '@angular/compiler';

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
        this.statements = _.orderBy(statements, 'createdAt', 'desc');
      });
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
