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
 * Resolve all Mca-Employee data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListMcaEmployeeResolver implements Resolve<McaEmployee[]> {
  constructor(private mcaEmployeeService: McaEmployeeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<McaEmployee[]> | Promise<McaEmployee[]> | McaEmployee[] {
    return this.mcaEmployeeService.getMcaEmployees().pipe(take(1));
  }
}
