import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Personnel } from 'src/app/shared/types/personnel';

/**
 * Resolve Personnel Data from url params
 *
 * @Example /generate/personnel/60224665fd0c8e1b11fa85d5 -> Resolve personnel data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class PersonnelResolver implements Resolve<Personnel> {
  constructor(private personnelService: PersonnelService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Personnel> | Promise<Personnel> | Personnel {
    const personnelId = route.paramMap.get('id');

    return this.personnelService.getPersonnel(personnelId).pipe(take(1));
  }
}
