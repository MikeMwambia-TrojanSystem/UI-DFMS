import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { PersonnelPost, Personnel } from '../shared/types/personnel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {
  private _personnels = new BehaviorSubject<Personnel[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get personnels() {
    return this._personnels;
  }

  get fetched() {
    return this._fetched;
  }

  getPersonnels(): Observable<Personnel[]> {
    return this._personnels.pipe(
      switchMap((personnels) =>
        iif(
          () => this._fetched,
          of(personnels),
          this.fetchPersonnels().pipe(map((result) => result))
        )
      )
    );
  }

  getPersonnel(id: string): Observable<Personnel> {
    return this.getPersonnels().pipe(
      map((personnels) => personnels.find((p) => p._id === id))
    );
  }

  fetchPersonnels() {
    return this.apiService.getPersonnels().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._personnels.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  deletePersonnel(id: string) {
    return this.apiService.deletePersonnel(id).pipe(
      tap((personnel) => {
        const personnelId = personnel._id;

        const newPersonnels = this._personnels
          .getValue()
          .filter((p) => p._id !== personnelId);

        this._personnels.next(newPersonnels);
      })
    );
  }

  postPersonnel(personnel: PersonnelPost) {
    return this.apiService.createPersonnel(personnel).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._personnels.next([...this._personnels.getValue(), message]);
        }
      })
    );
  }

  updatePersonnel(personnel: PersonnelPost) {
    return this.apiService.updatePersonnel(personnel).pipe(
      tap((result) => {
        const newPersonnels = this._personnels.getValue();
        const index = newPersonnels.findIndex((p) => p._id === result._id);

        newPersonnels[index] = {
          ...result,
        };

        this._personnels.next(newPersonnels);
      })
    );
  }
}
