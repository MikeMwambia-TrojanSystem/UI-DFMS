import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateTentativeBusiness implements CanActivate {
  constructor(
    private tentativeBusinessService: TentativeBusinessService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {
    const tentativeBusinessId = route.params.id;

    return this.tentativeBusinessService
      .getTentativeBusiness(tentativeBusinessId)
      .pipe(
        take(1),
        map((tentativeBusiness) =>
          tentativeBusiness ? true : this.router.createUrlTree(['/intro'])
        )
      );
  }
}
