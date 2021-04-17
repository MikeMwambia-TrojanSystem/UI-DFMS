import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Motion } from '../shared/types/motion';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NoticeOfMotionService {
  private _noticeOfMotions = new BehaviorSubject<Motion[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get motions() {
    return this._noticeOfMotions;
  }

  get fetched() {
    return this._fetched;
  }

  getNoticeOfMotions(): Observable<Motion[]> {
    return this._noticeOfMotions.pipe(
      switchMap((notices) =>
        iif(
          () => this._fetched,
          of(notices),
          this.fetchNoticeOfMotions().pipe(map((result) => result))
        )
      )
    );
  }

  getMotion(id: string): Observable<Motion> {
    return this._noticeOfMotions.pipe(
      switchMap((motions) =>
        iif(
          () => this._fetched,
          of(motions.find((motion) => motion._id === id)),
          this.fetchNoticeOfMotions().pipe(
            map((result) => result.find((motion) => motion._id === id))
          )
        )
      )
    );
  }

  fetchNoticeOfMotions() {
    return this.apiService.getNoticeOfMotions().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._noticeOfMotions.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }
}
