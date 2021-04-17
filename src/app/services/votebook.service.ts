import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { OrderPaper, OrderPaperPost } from '../shared/types/order-paper';
import { Votebook, VotebookPost } from '../shared/types/votebook';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class VotebookService {
  private _votebooks = new BehaviorSubject<Votebook[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get votebooks() {
    return this._votebooks;
  }

  get fetched() {
    return this._fetched;
  }

  getVotebooks(): Observable<Votebook[]> {
    return this._votebooks.pipe(
      switchMap((votebooks) =>
        iif(() => this._fetched, of(votebooks), this.fetchVotebook())
      )
    );
  }

  getVotebook(id: string): Observable<Votebook> {
    return this.getVotebooks().pipe(
      map((votebooks) => votebooks.find((v) => v._id === id))
    );
  }

  fetchVotebook(): Observable<Votebook[]> {
    return this.apiService.getVoteboook().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._votebooks.next(message);
          this._fetched = true;
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  postVotebook(votebook: VotebookPost): Observable<any> {
    return this.apiService.createVotebook(votebook).pipe(
      map(({ message }) => {
        if (this._fetched) {
          this._votebooks.next([...this._votebooks.getValue(), message]);
        }

        return message;
      })
    );
  }

  updateVotebook(votebook: VotebookPost): Observable<Votebook[]> {
    return this.apiService
      .updateVotebook(votebook)
      .pipe(switchMap(() => this.fetchVotebook()));
  }

  deleteVotebook(id: string): Observable<Votebook[]> {
    return this.apiService
      .deleteVotebook(id)
      .pipe(switchMap(() => this.fetchVotebook()));
  }

  checkNone(value: any[], transformation?: (value: any[]) => string): string {
    return !value.length
      ? 'NONE'
      : transformation
      ? transformation(value)
      : value.join('&&&');
  }
}
