import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  WardConSubPost,
  Ward,
  SubCounty,
  Constituency,
} from '../shared/types/ward-con-sub';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WardConSubService {
  private _wards = new BehaviorSubject<Ward[]>([]);
  private _subCounties = new BehaviorSubject<SubCounty[]>([]);
  private _constituencies = new BehaviorSubject<Constituency[]>([]);

  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get wards() {
    return this._wards;
  }
  get subCounties() {
    return this._subCounties;
  }
  get constituencies() {
    return this._constituencies;
  }

  get fetched() {
    return this._fetched;
  }

  getWards(): Observable<Ward[]> {
    return this._wards.pipe(
      switchMap((wards) =>
        iif(
          () => this._fetched,
          of(wards),
          this.fetchWardConSubs().pipe(
            map(
              (result) =>
                result.filter((item) => item.type === 'ward') as Ward[]
            )
          )
        )
      )
    );
  }

  getSubCounties(): Observable<SubCounty[]> {
    return this._subCounties.pipe(
      switchMap((subCounties) =>
        iif(
          () => this._fetched,
          of(subCounties),
          this.fetchWardConSubs().pipe(
            map((result) => {
              return result.filter(
                (item) => item.type === 'subcounty'
              ) as SubCounty[];
            })
          )
        )
      )
    );
  }

  getConstituencies(): Observable<Constituency[]> {
    return this._constituencies.pipe(
      switchMap((constituencies) =>
        iif(
          () => this._fetched,
          of(constituencies),
          this.fetchWardConSubs().pipe(
            map(
              (result) =>
                result.filter(
                  (item) => item.type === 'constituency'
                ) as Constituency[]
            )
          )
        )
      )
    );
  }

  getWard(id: string): Observable<Ward> {
    return this._wards.pipe(
      switchMap((wards) =>
        iif(
          () => this._fetched,
          of(wards.find((ward) => ward._id === id)),
          this.fetchWardConSubs().pipe(
            map((result) => result.find((item) => item._id === id) as Ward)
          )
        )
      )
    );
  }

  getSubCounty(id: string): Observable<SubCounty> {
    return this._subCounties.pipe(
      switchMap((subCounties) =>
        iif(
          () => this._fetched,
          of(subCounties.find((subCounty) => subCounty._id === id)),
          this.fetchWardConSubs().pipe(
            map((result) => result.find((item) => item._id === id) as SubCounty)
          )
        )
      )
    );
  }

  getConstituency(id: string): Observable<Constituency> {
    return this._constituencies.pipe(
      switchMap((constituencies) =>
        iif(
          () => this._fetched,
          of(constituencies.find((constituency) => constituency._id === id)),
          this.fetchWardConSubs().pipe(
            map(
              (result) => result.find((item) => item._id === id) as Constituency
            )
          )
        )
      )
    );
  }

  fetchWardConSubs() {
    return this.apiService.getWardConSub().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;

          let filtered = {
            ward: [],
            subcounty: [],
            constituency: [],
          };

          for (const item of message) {
            filtered[item.type].push(item);
          }

          this._wards.next(filtered.ward);
          this._subCounties.next(filtered.subcounty);
          this._constituencies.next(filtered.constituency);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  postWardConSub(
    data: WardConSubPost,
    type: 'ward' | 'constituency' | 'subcounty'
  ) {
    return this.apiService.createWardConSub(data).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          if (type === 'ward') {
            this._wards.next([...this._wards.getValue(), message as Ward]);
          }
          if (type === 'constituency') {
            this._constituencies.next([
              ...this._constituencies.getValue(),
              message as Constituency,
            ]);
          }
          if (type === 'subcounty') {
            this._subCounties.next([
              ...this._subCounties.getValue(),
              message as SubCounty,
            ]);
          }
        }
      })
    );
  }
}
