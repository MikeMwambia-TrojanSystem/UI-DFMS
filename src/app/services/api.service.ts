import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Committee, CommitteePost } from '../shared/types/committee';
import { DepartmentPost } from '../shared/types/department';
import { Motion, MotionPost } from '../shared/types/motion';
import { WardConSubPost } from '../shared/types/ward-con-sub';

interface ApiResponse<T> {
  message: T;
  success: boolean;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://web.jonikisecurity.com/';

  constructor(private http: HttpClient) {}

  // POSTs
  createCommittee(committee: CommitteePost) {
    return this.http
      .post(this.baseUrl + 'commitee/create', undefined, {
        params: {
          ...committee,
        },
      })
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  createMotion(motion: MotionPost) {
    return this.http
      .post(this.baseUrl + 'motion/create', undefined, {
        params: {
          ...motion,
        },
      })
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  createWardConSub(data: WardConSubPost) {
    return this.http.post(this.baseUrl + 'wardsConSub/create', undefined, {
      params: {
        ...data,
      },
    });
  }

  createDepartment(department: DepartmentPost) {
    return this.http.post(this.baseUrl + 'department/create', undefined, {
      params: {
        ...department,
      },
    });
  }

  // GETs
  getCommittees() {
    return this.http
      .get<ApiResponse<Committee[]>>(this.baseUrl + 'commitee/getAllCommitees')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  getMotions() {
    return this.http
      .get<ApiResponse<Motion[]>>(this.baseUrl + 'motion/getAllMotions')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
