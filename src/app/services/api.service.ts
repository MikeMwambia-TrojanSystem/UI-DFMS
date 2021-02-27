import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';

import { Committee, CommitteePost } from '../shared/types/committee';
import { Department, DepartmentPost } from '../shared/types/department';
import { McaEmployee } from '../shared/types/mca-employee';
import { Motion, MotionPost } from '../shared/types/motion';
import { WardConSub, WardConSubPost } from '../shared/types/ward-con-sub';

interface ApiResponse<T> {
  message: T;
  success: boolean;
  status: number;
}

const errorHandler = (error: HttpErrorResponse) => {
  alert('ERROR');
  return throwError(error);
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _baseUrl = 'https://web.jonikisecurity.com/';
  private _timeout = 60 * 1000;

  constructor(private http: HttpClient) {}

  // POSTs
  private _postRequest<T, U>(endpoint: string, data: T) {
    return this.http
      .post<ApiResponse<U>>(this._baseUrl + endpoint, undefined, {
        params: {
          ...(data as any),
        },
      })
      .pipe(timeout(this._timeout), catchError(errorHandler));
  }

  createCommittee(committee: CommitteePost) {
    return this._postRequest<CommitteePost, Committee>(
      'commitee/create',
      committee
    );
  }

  createMotion(motion: MotionPost) {
    return this._postRequest<MotionPost, Motion>('motion/create', motion);
  }

  createWardConSub(data: WardConSubPost) {
    return this._postRequest<WardConSubPost, WardConSub>(
      'wardsConSub/create',
      data
    );
  }

  createDepartment(department: DepartmentPost) {
    return this._postRequest<DepartmentPost, Department>(
      'department/create',
      department
    );
  }

  // GETs
  private _getRequest<T>(endpoint: string) {
    return this.http
      .get<ApiResponse<T[] | string>>(this._baseUrl + endpoint)
      .pipe(timeout(this._timeout), catchError(errorHandler));
  }

  getCommittees() {
    return this._getRequest<Committee>('commitee/getAllCommitees');
  }

  getMotions() {
    return this._getRequest<Motion>('motion/getAllMotions');
  }

  getDepartments() {
    return this._getRequest<Department>('department/getAllDepartments');
  }

  getWardConSub() {
    return this._getRequest<WardConSub>('wardsConSub/getAllGovInfo');
  }

  getMcaEmployee() {
    return this._getRequest<McaEmployee>('mcaProfile/getAllMca');
  }

  //DELETEs
  private _deleteRequest<T>(endpoint: string, id: string) {
    return this.http
      .delete<ApiResponse<T>>(this._baseUrl + endpoint, {
        params: {
          id,
        },
      })
      .pipe(
        timeout(this._timeout),
        catchError(errorHandler),
        map(({ message }) => message)
      );
  }

  deleteMotion(id: string) {
    return this._deleteRequest<Motion>('motion/deleteSpecificMotion', id);
  }

  deleteWardConSub<T>(id: string) {
    return this._deleteRequest<T>('wardsConSub/delete', id);
  }

  deleteDepartment(id: string) {
    return this._deleteRequest<Department>('department/delete', id);
  }

  //UPDATEs
  private _updateRequest<T, U>(endpoint: string, data: T) {
    return this.http
      .put<ApiResponse<U>>(this._baseUrl + endpoint, undefined, {
        params: data as any,
      })
      .pipe(
        timeout(this._timeout),
        catchError(errorHandler),
        map(({ message }) => message)
      );
  }

  updateMotion(motion: MotionPost) {
    return this._updateRequest<MotionPost, Motion>(
      'motion/updateSpecificMotion',
      motion
    );
  }

  updateCommittee(committee: CommitteePost) {
    return this._updateRequest<CommitteePost, Committee>(
      'commitee/updateSpecificCommitees',
      committee
    );
  }

  updateWardConSub<T, U>(item: U) {
    return this._updateRequest<U, T>('wardsConSub/update', item);
  }

  updateDepartment(department: DepartmentPost) {
    return this._updateRequest<DepartmentPost, Department>(
      'department/update',
      department
    );
  }
}
