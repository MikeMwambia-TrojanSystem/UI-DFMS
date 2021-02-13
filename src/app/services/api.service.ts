import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Committee, CommitteePost } from '../shared/types/committee';
import { Motion } from '../shared/types/motion';

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
  createCommittee(commitee: CommitteePost) {
    return this.http
      .post(this.baseUrl + 'commitee/create', commitee)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  createMotion(motion: Motion) {
    return this.http
      .post(this.baseUrl + 'motion/create', motion)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  // GETs
  getCommittees() {
    return this.http
      .get<ApiResponse<Committee[]>>(this.baseUrl + 'commitee/getAllCommitees')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  getMotions() {
    return this.http
      .get(this.baseUrl + 'motion/getAllMotions')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
