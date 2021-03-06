import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatementService } from 'src/app/services/statement.service';
import { Statement } from 'src/app/shared/types/statement';

/**
 * Resolve Statement Data from url params
 *
 * @Example /upload/statement/60224665fd0c8e1b11fa85d5 -> Resolve statement data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class StatementResolver implements Resolve<Statement> {
  constructor(private statementService: StatementService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const statementId = route.paramMap.get('id');

    return this.statementService.getStatement(statementId).pipe(take(1));
  }
}
