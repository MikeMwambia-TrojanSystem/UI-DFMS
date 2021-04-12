import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';
import { Speaker } from '../../types/speaker';

@Injectable({
  providedIn: 'root',
})
export class SpeakerResolver implements Resolve<Speaker> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Speaker> | Promise<Speaker> | Speaker {
    return this.apiService.getSpeaker().pipe(
      take(1),
      map(({ message }) => message)
    );
  }
}
