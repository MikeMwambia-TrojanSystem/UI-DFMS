import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StatementService } from 'src/app/services/statement.service';

/**
 * Prevent accessing not found statement ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateStatement implements CanActivate {
  constructor(
    private statementService: StatementService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const statementId = route.params.id;

    return this.statementService.getStatement(statementId).pipe(
      take(1),
      map((statement) => {
        if (statement) {
          return true;
        }

        return this.router.createUrlTree(['/upload/statement']);
      })
    );
  }
}
