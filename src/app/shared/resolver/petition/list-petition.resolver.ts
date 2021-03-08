import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PetitionService } from 'src/app/services/petition.service';

/**
 * Resolve all Petition data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListPetitionResolver implements Resolve<any[]> {
  constructor(private petitionService: PetitionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> | Promise<any[]> | any[] {
    const publishState = route.queryParams.state || 'public';

    return this.petitionService.fetchPetitions().pipe(
      take(1),
      map((petitions) =>
        petitions.filter((p) => p.publishState === publishState)
      )
    );
  }
}
