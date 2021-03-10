import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActService } from 'src/app/services/act.service';
import { Act } from '../../types/act';

/**
 * Resolve all Act data.
 */
@Injectable({
  providedIn: 'root',
})
export class ListActResolver implements Resolve<Act[]> {
  constructor(private actService: ActService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Act[]> | Promise<Act[]> | Act[] {
    const publishState = route.queryParams.state || 'public';

    return this.actService.fetchActs().pipe(
      take(1),
      map((acts) => acts.filter((a) => a.publishState === publishState))
    );
  }
}
