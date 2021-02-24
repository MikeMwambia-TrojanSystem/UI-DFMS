import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Department, DepartmentPost } from '../shared/types/department';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private _departments = new BehaviorSubject<Department[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get departments() {
    return this._departments;
  }

  get fetched() {
    return this._fetched;
  }

  getDepartments(): Observable<Department[]> {
    return this._departments.pipe(
      switchMap((departments) =>
        iif(
          () => this._fetched,
          of(departments),
          this.fetchDepartments().pipe(map((result) => result))
        )
      )
    );
  }

  getDepartment(id: string): Observable<Department> {
    return this._departments.pipe(
      switchMap((departments) =>
        iif(
          () => this._fetched,
          of(departments.find((department) => department._id === id)),
          this.fetchDepartments().pipe(
            map((result) => result.find((department) => department._id === id))
          )
        )
      )
    );
  }

  fetchDepartments() {
    return this.apiService.getDepartments().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this.departments.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  postDepartment(department: DepartmentPost) {
    return this.apiService.createDepartment(department).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._departments.next([...this._departments.getValue(), message]);
        }
      })
    );
  }
}
