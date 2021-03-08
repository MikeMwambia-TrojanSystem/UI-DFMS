import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StatementService } from 'src/app/services/statement.service';
import { Statement } from '../../types/statement';

/**
 * Resolve all Statement data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListStatementResolver implements Resolve<Statement[]> {
  constructor(private statementService: StatementService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Statement[]> | Promise<Statement[]> | Statement[] {
    const publishState = route.queryParams.state || 'public';

    return this.statementService.fetchStatements().pipe(
      take(1),
      map((statements) =>
        statements.filter((s) => s.publishState === publishState)
      )
    );
  }
}
