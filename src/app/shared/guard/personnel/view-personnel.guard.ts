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
import { PersonnelService } from 'src/app/services/personnel.service';

/**
 * Prevent accessing not found personnel ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivateViewPersonnel implements CanActivate {
  constructor(
    private personnelService: PersonnelService,
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
    const personnelId = route.params.id;

    return this.personnelService.getPersonnel(personnelId).pipe(
      take(1),
      map((personnel) => {
        if (personnel) {
          return true;
        }

        return this.router.createUrlTree(['/create/employee']);
      })
    );
  }
}
