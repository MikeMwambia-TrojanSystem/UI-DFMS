import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Committee, CommitteePost } from '../shared/types/committee';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommitteeService {
  private _committees = new BehaviorSubject<Committee[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get committees() {
    return this._committees;
  }

  get fetched() {
    return this._fetched;
  }

  getCommittees(): Observable<Committee[]> {
    return this._committees.pipe(
      switchMap((committees) =>
        iif(
          () => this._fetched,
          of(committees),
          this.fetchCommittees().pipe(map((result) => result))
        )
      )
    );
  }

  getCommittee(id: string): Observable<Committee> {
    return this._committees.pipe(
      switchMap((committees) =>
        iif(
          () => this._fetched,
          of(committees.find((committee) => committee._id === id)),
          this.fetchCommittees().pipe(
            map((result) => {
              return result.find((committee) => committee._id === id);
            })
          )
        )
      )
    );
  }

  fetchCommittees() {
    return this.apiService.getCommittees().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._committees.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  postCommittee(committee: CommitteePost) {
    return this.apiService.createCommittee(committee).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._committees.next([...this._committees.getValue(), message]);
        }
      })
    );
  }

  updateCommittee(committee: CommitteePost) {
    return this.apiService.updateCommittee(committee).pipe(
      tap((result) => {
        const newCommittee = this._committees.getValue();
        const index = newCommittee.findIndex((com) => com._id === result._id);

        newCommittee[index] = {
          ...result,
        };

        this._committees.next(newCommittee);
      })
    );
  }

  deleteCommittee(id: string) {
    return this.apiService.deleteCommittee(id).pipe(
      tap((result) => {
        const newCommittee = this._committees.getValue();
        const index = newCommittee.findIndex((com) => com._id === result._id);

        newCommittee.splice(index, 1);

        this._committees.next(newCommittee);
      })
    );
  }
}
