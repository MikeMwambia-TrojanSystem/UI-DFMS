import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/shared/types/department';

/**
 * Resolve Department Data from url params
 *
 * @Example /generate/department/60224665fd0c8e1b11fa85d5 -> Resolve department data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class DepartmentResolver implements Resolve<Department> {
  constructor(private departmentService: DepartmentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const departmentId = route.paramMap.get('id');

    return this.departmentService.getDepartment(departmentId).pipe(take(1));
  }
}
