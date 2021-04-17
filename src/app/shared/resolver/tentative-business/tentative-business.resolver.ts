import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { TentativeBusiness } from '../../types/tentative-business';

@Injectable({
  providedIn: 'root',
})
export class TentativeBusinessResolver implements Resolve<TentativeBusiness> {
  constructor(private tentativeBusinessService: TentativeBusinessService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ):
    | TentativeBusiness
    | Promise<TentativeBusiness>
    | Observable<TentativeBusiness> {
    const tentativeBusinessId = route.params.id;

    return this.tentativeBusinessService
      .getTentativeBusiness(tentativeBusinessId)
      .pipe(take(1));
  }
}
