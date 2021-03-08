import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Personnel } from '../../types/personnel';

/**
 * Resolve all Personnel data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListPersonnelResolver implements Resolve<Personnel[]> {
  constructor(private personnelService: PersonnelService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Personnel[]> | Promise<Personnel[]> | Personnel[] {
    const publishState = route.queryParams.state !== 'draft';

    return this.personnelService.fetchPersonnels().pipe(
      take(1),
      map((personnels) => personnels.filter((p) => p.status === publishState))
    );
  }
}
