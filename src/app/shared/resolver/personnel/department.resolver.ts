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

@Injectable({
  providedIn: 'root',
})
export class PersonnelDepartmentResolver implements Resolve<Department[]> {
  constructor(private departmentService: DepartmentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Department[] | Promise<Department[]> | Observable<Department[]> {
    return this.departmentService.fetchDepartments().pipe(take(1));
  }
}
