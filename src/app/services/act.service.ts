import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Act, ActPost } from '../shared/types/act';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ActService {
  private _acts = new BehaviorSubject<Act[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get acts() {
    return this._acts;
  }

  get fetched() {
    return this._fetched;
  }

  getActs(): Observable<Act[]> {
    return this._acts.pipe(
      switchMap((acts) =>
        iif(
          () => this._fetched,
          of(acts),
          this.fetchActs().pipe(map((result) => result))
        )
      )
    );
  }

  getAct(id: string): Observable<Act> {
    return this.getActs().pipe(
      map((acts) => acts.find((act) => act._id === id))
    );
  }

  fetchActs() {
    return this.apiService.getActs().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._acts.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  deleteAct(id: string) {
    return this.apiService.deleteAct(id).pipe(
      tap((act) => {
        const actId = act._id;

        const newActs = this._acts.getValue().filter((a) => a._id !== actId);

        this._acts.next(newActs);
      })
    );
  }

  postAct(act: ActPost) {
    return this.apiService.createAct(act).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._acts.next([...this._acts.getValue(), message]);
        }
      })
    );
  }

  updateAct(act: ActPost) {
    return this.apiService.updateAct(act).pipe(
      tap((result) => {
        const newActs = this._acts.getValue();
        const index = newActs.findIndex((a) => a._id === result._id);

        newActs[index] = {
          ...result,
        };

        this._acts.next(newActs);
      })
    );
  }
}
