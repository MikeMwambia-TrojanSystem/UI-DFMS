import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  TentativeBusiness,
  TentativeBusinessPost,
} from '../shared/types/tentative-business';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TentativeBusinessService {
  private _tentativeBusinesses = new BehaviorSubject<TentativeBusiness[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get tentativeBusinesses() {
    return this._tentativeBusinesses;
  }

  get fetched() {
    return this._fetched;
  }

  getTentativeBusinesses(): Observable<TentativeBusiness[]> {
    return this._tentativeBusinesses.pipe(
      switchMap((tbs) =>
        iif(() => this._fetched, of(tbs), this.fetchTentativeBusinesses())
      )
    );
  }

  getTentativeBusiness(id: string): Observable<TentativeBusiness> {
    return this.getTentativeBusinesses().pipe(
      map((tbs) => tbs.find((o) => o._id === id))
    );
  }

  fetchTentativeBusinesses(): Observable<TentativeBusiness[]> {
    return this.apiService.getTentativeBusinesses().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._tentativeBusinesses.next(message);
          this._fetched = true;
        }
      }),
      map(({ message }) => {
        return Array.isArray(message) ? message : [];
      })
    );
  }

  postTentativeBusiness(
    tb: TentativeBusinessPost
  ): Observable<TentativeBusiness> {
    return this.apiService.createTentativeBusiness(tb).pipe(
      map(({ message }) => {
        if (this._fetched) {
          this._tentativeBusinesses.next([
            ...this._tentativeBusinesses.getValue(),
            message,
          ]);
        }

        return message;
      })
    );
  }

  updateTentativeBusiness(
    tb: TentativeBusinessPost
  ): Observable<TentativeBusiness> {
    return this.apiService.updateTentativeBusiness(tb).pipe(
      tap((result) => {
        if (this._fetched) {
          const newValue = this._tentativeBusinesses.getValue();
          const index = newValue.findIndex((o) => o._id === result._id);

          newValue.splice(index, 1, result);

          this._tentativeBusinesses.next(newValue);
        }
      })
    );
  }

  deleteTentativeBusiness(id: string): Observable<TentativeBusiness> {
    return this.apiService.deleteTentativeBusiness(id).pipe(
      tap((result) => {
        if (this._fetched) {
          const newValue = this._tentativeBusinesses.getValue();
          const index = newValue.findIndex((o) => o._id === result._id);

          newValue.splice(index, 1);

          this._tentativeBusinesses.next(newValue);
        }
      })
    );
  }

  checkNone(field: string[]): string {
    return field.length ? field.join('&&&') : 'NONE';
  }
}
