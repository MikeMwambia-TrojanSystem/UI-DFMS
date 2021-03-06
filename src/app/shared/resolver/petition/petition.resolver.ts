import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PetitionService } from 'src/app/services/petition.service';
import { Petition } from 'src/app/shared/types/petition';

/**
 * Resolve Petition Data from url params
 *
 * @Example /generate/petition/60224665fd0c8e1b11fa85d5 -> Resolve petition data with _id of '60224665fd0c8e1b11fa85d5'
 */
@Injectable({
  providedIn: 'root',
})
export class PetitionResolver implements Resolve<Petition> {
  constructor(private petitionService: PetitionService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const petitionId = route.paramMap.get('id');

    return this.petitionService.getPetition(petitionId).pipe(take(1));
  }
}
