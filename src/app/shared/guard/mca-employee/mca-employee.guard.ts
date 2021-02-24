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

import { McaEmployeeService } from 'src/app/services/mca-employee.service';

/**
 * Prevent accessing not found mcaEmployee ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateMcaEmployee implements CanActivate {
  constructor(
    private mcaEmployeeService: McaEmployeeService,
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
    const mcaEmployeeId = route.params.id;

    return this.mcaEmployeeService.getMcaEmployee(mcaEmployeeId).pipe(
      take(1),
      map((mcaEmployee) => {
        if (mcaEmployee) {
          return true;
        }

        return this.router.createUrlTree(['/create/mcaEmployee']);
      })
    );
  }
}
