import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { PetitionerService } from 'src/app/services/petitioner.service';
import { Petitioner } from '../../types/petitioner';

/**
 * Resolve all Petitioner data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListPetitionerResolver implements Resolve<Petitioner[]> {
  constructor(private petitionerService: PetitionerService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> | Promise<any[]> | any[] {
    const publishState = route.queryParams.state || 'public';

    return this.petitionerService.getPetitioners().pipe(
      take(1),
      // map((petitions) =>
      //   petitions.filter((p) => p.publishState === publishState)
      // )
    );
  }
}
