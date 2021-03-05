import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DepartmentService } from 'src/app/services/department.service';
import { Department } from '../../types/department';

/**
 * Resolve all Department data.
 */
@Injectable({
  providedIn: 'root',
})
export class PersonnelDepartmentsResolver implements Resolve<Department[]> {
  constructor(private departmentService: DepartmentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Department[]> | Promise<Department[]> | Department[] {
    return this.departmentService.getDepartments().pipe(take(1));
  }
}
