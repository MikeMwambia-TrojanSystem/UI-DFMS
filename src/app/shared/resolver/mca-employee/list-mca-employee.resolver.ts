import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
    const publishedState = route.queryParams.state !== 'draft';

    return this.mcaEmployeeService.fetchMcaEmployees().pipe(
      take(1)
      // map((mcaEmployees) =>
      //   mcaEmployees.filter((e) => e.status === publishedState)
      // )
    );
  }
}
