import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { TentativeBusiness } from '../../types/tentative-business';

@Injectable({
  providedIn: 'root',
})
export class ListTentativeBusinessResolver
  implements Resolve<TentativeBusiness[]> {
  constructor(private tentativeBusinessService: TentativeBusinessService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ):
    | TentativeBusiness[]
    | Promise<TentativeBusiness[]>
    | Observable<TentativeBusiness[]> {
    const publishState = route.queryParams.state || 'public';

    return this.tentativeBusinessService.getTentativeBusinesses().pipe(
      take(1),
      map((tentativeBusiness) =>
        tentativeBusiness.filter((t) => t.publishState === publishState)
      )
    );
  }
}
