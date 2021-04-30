import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Motion, MotionPost } from '../shared/types/motion';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MotionService {
  private _motions = new BehaviorSubject<Motion[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get motions() {
    return this._motions;
  }

  get fetched() {
    return this._fetched;
  }

  getMotions(): Observable<Motion[]> {
    return this._motions.pipe(
      switchMap((motions) =>
        iif(
          () => this._fetched,
          of(motions),
          this.fetchMotions().pipe(map((result) => result))
        )
      )
    );
  }

  getMotion(id: string): Observable<Motion> {
    return this._motions.pipe(
      switchMap((motions) =>
        iif(
          () => this._fetched,
          of(motions.find((motion) => motion._id === id)),
          this.fetchMotions().pipe(
            map((result) => result.find((motion) => motion._id === id))
          )
        )
      )
    );
  }

  fetchMotions() {
    return this.apiService.getMotions().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._motions.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  deleteMotion(id: string) {
    return this.apiService.deleteMotion(id).pipe(
      tap((motion) => {
        const motionId = motion._id;

        const newMotions = this.motions
          .getValue()
          .filter((motion) => motion._id !== motionId);

        this._motions.next(newMotions);
      })
    );
  }

  postMotion(motion: MotionPost) {
    return this.apiService.createMotion(motion).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._motions.next([...this._motions.getValue(), message]);
        }
      })
    );
  }

  updateMotion(motion: MotionPost) {
    return this.apiService.updateMotion(motion).pipe(
      tap((result) => {
        const newMotions = this._motions.getValue();
        const index = newMotions.findIndex(
          (motionEle) => motionEle._id === result._id
        );

        newMotions[index] = {
          ...result,
        };

        this._motions.next(newMotions);
      })
    );
  }

  approveMotion(id: string) {
    return this.apiService.approve('motion', id);
  }
}
