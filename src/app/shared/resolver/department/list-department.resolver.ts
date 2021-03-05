import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/shared/types/department';

/**
 * Resolve all Motion data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListDepartmentResolver implements Resolve<Department[]> {
  constructor(private departmentService: DepartmentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Department[]> | Promise<Department[]> | Department[] {
    const published = route.queryParams.state !== 'draft';

    return this.departmentService.getDepartments().pipe(
      take(1),
      map((departments) => departments.filter((d) => d.published === published))
    );
  }
}
