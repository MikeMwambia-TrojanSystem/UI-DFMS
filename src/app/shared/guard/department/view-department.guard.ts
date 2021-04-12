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

import { DepartmentService } from 'src/app/services/department.service';

/**
 * Prevent accessing not found department ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateViewDepartment implements CanActivate {
  constructor(
    private departmentService: DepartmentService,
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
    const departmentId = route.params.id;

    return this.departmentService.getDepartment(departmentId).pipe(
      take(1),
      map((department) => {
        if (department) {
          return true;
        }

        return this.router.createUrlTree(['/create/department']);
      })
    );
  }
}
