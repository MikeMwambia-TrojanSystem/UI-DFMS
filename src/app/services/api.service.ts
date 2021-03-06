import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

import { Committee, CommitteePost } from '../shared/types/committee';
import { Department, DepartmentPost } from '../shared/types/department';
import { McaEmployee, McaPost } from '../shared/types/mca-employee';
import { Motion, MotionPost } from '../shared/types/motion';
import { Statement, StatementPost } from '../shared/types/statement';
import { WardConSub, WardConSubPost } from '../shared/types/ward-con-sub';
import { Upload } from '../shared/types/upload';
import { Petition, PetitionPost } from '../shared/types/petition';
import { BillPost, Bill } from '../shared/types/bill';
import { Act, ActPost } from '../shared/types/act';
import { Personnel, PersonnelPost } from '../shared/types/personnel';

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
  private _baseUrl = 'http://localhost:3000/';//'https://web.jonikisecurity.com/';
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

  createMca(mca: McaPost) {
    return this._postRequest<McaPost, McaEmployee>('mcaProfile/create', mca);
  }

  createStatement(statement: StatementPost) {
    return this._postRequest<StatementPost, Statement>(
      'statement/create',
      statement
    );
  }

  createPetition(petition: PetitionPost) {
    return this._postRequest<PetitionPost, Petition>(
      'petition/create',
      petition
    );
  }

  createBill(bill: BillPost) {
    return this._postRequest<BillPost, Bill>('bills/create', bill);
  }

  createAct(act: ActPost) {
    return this._postRequest<ActPost, Act>('acts/create', act);
  }

  createPersonnel(personnel: PersonnelPost) {
    return this._postRequest<PersonnelPost, Personnel>(
      'personnel/create',
      personnel
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

  getStatements() {
    return this._getRequest<Statement>('statement/getAllStatements');
  }

  getPetitions() {
    return this._getRequest<Petition>('petition/getAllPetition');
  }

  getBills() {
    return this._getRequest<Bill>('bills/getAllBills');
  }

  getActs() {
    return this._getRequest<Act>('acts/getAllActs');
  }

  getPersonnels() {
    return this._getRequest<Personnel>('personnel/getAllPersonnel');
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

  deleteCommittee(id: string) {
    return this._deleteRequest<Committee>('commitee/delete', id);
  }

  deleteMca(id: string) {
    return this._deleteRequest<McaEmployee>('mcaProfile/deleteMca', id);
  }

  deleteStatement(id: string) {
    return this._deleteRequest<Statement>('statement/deleteStatement', id);
  }

  deletePetition(id: string) {
    return this._deleteRequest<Petition>('petition/delete', id);
  }

  deleteBill(id: string) {
    return this._deleteRequest<Bill>('bills/delete', id);
  }

  deleteAct(id: string) {
    return this._deleteRequest<Act>('act/delete', id);
  }

  deletePersonnel(id: string) {
    return this._deleteRequest<Personnel>('personnel/delete', id);
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

  updateMca(mca: McaPost) {
    return this._updateRequest<McaPost, McaEmployee>(
      'mcaProfile/updateMca',
      mca
    );
  }

  updateStatement(statement: StatementPost) {
    return this._updateRequest<StatementPost, Statement>(
      'statement/update',
      statement
    );
  }

  updatePetition(petition: PetitionPost) {
    return this._updateRequest<PetitionPost, Petition>(
      'petition/update',
      petition
    );
  }

  updateBill(bill: BillPost) {
    return this._updateRequest<BillPost, Bill>('bills/update', bill);
  }

  updateAct(act: ActPost) {
    return this._updateRequest<ActPost, Act>('acts/update', act);
  }

  updatePersonnel(personnel: PersonnelPost) {
    return this._updateRequest<PersonnelPost, Personnel>(
      'personnel/update',
      personnel
    );
  }

  // UPLOAD
  upload(data: FormData) {
    return of({
      etag: 'test',
      id: 'test',
      key: 'test',
      location: 'google.com',
      uploadedToS3: true,
    });
    // return this.http
    //   .post<Upload>('http://3.13.186.200:9000/uploadfile', data)
    //   .pipe(timeout(this._timeout), catchError(errorHandler));
  }
}
