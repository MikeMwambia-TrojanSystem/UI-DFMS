import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { Committee, CommitteePost } from '../shared/types/committee';
import { Department, DepartmentPost } from '../shared/types/department';
import { Motion, MotionPost } from '../shared/types/motion';
import { WardConSub, WardConSubPost } from '../shared/types/ward-con-sub';

interface ApiResponse<T> {
  message: T;
  success: boolean;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _baseUrl = 'https://web.jonikisecurity.com/';
  private _timeout = 15000;

  constructor(private http: HttpClient) {}

  // POSTs
  private _postRequest<T, U>(endpoint: string, data: T) {
    return this.http
      .post<ApiResponse<U>>(this._baseUrl + endpoint, undefined, {
        params: {
          ...(data as any),
        },
      })
      .pipe(
        timeout(this._timeout),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
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
    return this.http.get<ApiResponse<T[]>>(this._baseUrl + endpoint).pipe(
      timeout(this._timeout),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
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

  //DELETEs
  deleteMotion(id: string) {
    return this.http
      .delete<ApiResponse<Motion>>(
        this._baseUrl + 'motion/deleteSpecificMotion',
        {
          params: {
            id,
          },
        }
      )
      .pipe(
        timeout(this._timeout),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }
}
