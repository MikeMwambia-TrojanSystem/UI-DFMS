import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { McaEmployee } from '../shared/types/mca-employee';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class McaEmployeeService {
  private _mcaEmployees = new BehaviorSubject<McaEmployee[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get mcaEmployees() {
    return this._mcaEmployees;
  }

  getMcaEmployees(): Observable<McaEmployee[]> {
    return this._mcaEmployees.pipe(
      switchMap((mcaEmployees) =>
        iif(
          () => this._fetched,
          of(mcaEmployees),
          this.fetchMcaEmployees().pipe(map((result) => result))
        )
      )
    );
  }

  getMcaEmployee(id: string): Observable<McaEmployee> {
    return this._mcaEmployees.pipe(
      switchMap((mcaEmployees) =>
        iif(
          () => this._fetched,
          of(mcaEmployees.find((mcaEmployee) => mcaEmployee._id === id)),
          this.fetchMcaEmployees().pipe(
            map((result) =>
              result.find((mcaEmployee) => mcaEmployee._id === id)
            )
          )
        )
      )
    );
  }

  fetchMcaEmployees() {
    return this.apiService.getMcaEmployee().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._mcaEmployees.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }
}
