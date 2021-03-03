import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { McaEmployeeService } from 'src/app/services/mca-employee.service';
import { McaEmployee } from 'src/app/shared/types/mca-employee';

/**
 * Resolve Mca Data from url params
 *
 * @Example /create/mca/60224665fd0c8e1b11fa85d5 -> Resolve mca data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class McaResolver implements Resolve<McaEmployee> {
  constructor(private mcaEmployeeService: McaEmployeeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const mcaId = route.paramMap.get('id');

    return this.mcaEmployeeService.getMcaEmployee(mcaId).pipe(take(1));
  }
}
