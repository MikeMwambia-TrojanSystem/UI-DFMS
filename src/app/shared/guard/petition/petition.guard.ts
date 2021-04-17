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
import { PetitionService } from 'src/app/services/petition.service';

/**
 * Prevent accessing not found petition ID
 */
@Injectable({
  providedIn: 'root',
})
export class CanActivatePetition implements CanActivate {
  constructor(
    private petitionService: PetitionService,
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
    const petitionId = route.params.id;

    return this.petitionService.getPetition(petitionId).pipe(
      take(1),
      map((petition) => {
        if (petition) {
          return true;
        }

        return this.router.createUrlTree(['/generate/petition']);
      })
    );
  }
}
