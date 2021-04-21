import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
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
import { Report, ReportPost } from '../shared/types/report';
import { PhoneVerification } from '../shared/types/verification';
import { OrderPaper, OrderPaperPost } from '../shared/types/order-paper';
import { Votebook, VotebookPost } from '../shared/types/votebook';
import { Speaker } from '../shared/types/speaker';
import {
  TentativeBusiness,
  TentativeBusinessPost,
} from '../shared/types/tentative-business';

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
    return this._postRequest<McaPost, { mcaId: string; request_id: string }>(
      'mcaProfile/create',
      mca
    );
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
    return this._postRequest<
      PersonnelPost,
      { personnelId: string; request_id: string }
    >('personnel/create', personnel);
  }

  createReport(report: ReportPost) {
    return this._postRequest<ReportPost, Report>('report/create', report);
  }

  createOrderPaper(orderPaper: OrderPaperPost) {
    return this._postRequest<OrderPaperPost, OrderPaper>(
      'orderPaper/create',
      orderPaper
    );
  }

  createVotebook(votebook: VotebookPost) {
    return this._postRequest<VotebookPost, Votebook>(
      'votebook/create',
      votebook
    );
  }

  createTentativeBusiness(tb: TentativeBusinessPost) {
    return this._postRequest<TentativeBusinessPost, TentativeBusiness>(
      'tentativeBiz/create',
      tb
    );
  }

  // GETs
  private _getRequest<T>(endpoint: string) {
    return this.http
      .get<ApiResponse<T[] | string>>(this._baseUrl + endpoint)
      .pipe(timeout(this._timeout), catchError(errorHandler));
  }

  getCommittees(): Observable<ApiResponse<Committee[] | string>> {
    return this._getRequest<Committee>('commitee/getAllCommitees');
  }

  getMotions(): Observable<ApiResponse<Motion[] | string>> {
    return this._getRequest<Motion>('motion/getAllMotions');
  }

  getNoticeOfMotions(): Observable<ApiResponse<Motion[] | string>> {
    return this._getRequest<Motion>('motion/getAllMotionNotices');
  }

  getDepartments(): Observable<ApiResponse<Department[] | string>> {
    return this._getRequest<Department>('department/getAllDepartments');
  }

  getWardConSub(): Observable<ApiResponse<WardConSub[] | string>> {
    return this._getRequest<WardConSub>('wardsConSub/getAllGovInfo');
  }

  getMcaEmployee(): Observable<ApiResponse<McaEmployee[] | string>> {
    return this._getRequest<McaEmployee>('mcaProfile/getAllMca');
  }

  getStatements(): Observable<ApiResponse<Statement[] | string>> {
    return this._getRequest<Statement>('statement/getAllStatements');
  }

  getPetitions(): Observable<ApiResponse<string | Petition[]>> {
    return this._getRequest<Petition>('petition/getAllPetition');
  }

  getBills(): Observable<ApiResponse<Bill[] | string>> {
    return this._getRequest<Bill>('bills/getAllbills');
  }

  getActs(): Observable<ApiResponse<Act[] | string>> {
    return this._getRequest<Act>('acts/getAllActs');
  }

  getPersonnels(): Observable<ApiResponse<Personnel[] | string>> {
    return this._getRequest<Personnel>('personnel/getAllPersonnel');
  }

  getReports(): Observable<ApiResponse<Report[] | string>> {
    return this._getRequest<Report>('report/getAllReports');
  }

  getOrderPaper(): Observable<ApiResponse<OrderPaper[] | string>> {
    return this._getRequest<OrderPaper>('orderPaper/getAllOrderPapers');
  }

  getVoteboook() {
    return this._getRequest<Votebook>('votebook/getAllVotebooks');
  }

  getSpeaker(): Observable<ApiResponse<Speaker>> {
    return (this._getRequest<Speaker>(
      'assemblyManagement/getSpeaker'
    ) as unknown) as Observable<ApiResponse<Speaker>>;
  }

  getTentativeBusinesses() {
    return this._getRequest<TentativeBusiness>(
      'tentativeBiz/getAllTentativeBiz'
    );
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

  deleteReport(id: string) {
    return this._deleteRequest<Report>('report/deleteReport', id);
  }

  deleteOrderPaper(id: string) {
    return this._deleteRequest<OrderPaper>(
      'orderPaper/deleteSpecificPaper',
      id
    );
  }

  deleteVotebook(id: string) {
    return this._deleteRequest<Votebook>('votebook/deleteVotebook', id);
  }

  deleteTentativeBusiness(id: string) {
    return this._deleteRequest<TentativeBusiness>(
      'tentativeBiz/deleteSpecificBiz',
      id
    );
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

  updateReport(report: ReportPost) {
    return this._updateRequest<ReportPost, Report>(
      'report/updateReport',
      report
    );
  }

  updateOrderPaper(orderPaper: OrderPaperPost) {
    return this._updateRequest<OrderPaperPost, OrderPaper>(
      'orderPaper/updateSpecificPaper',
      orderPaper
    );
  }

  updateVotebook(votebook: VotebookPost) {
    return this._updateRequest<VotebookPost, Votebook>(
      'votebook/updateVotebook',
      votebook
    );
  }

  updateTentativeBusiness(tb: TentativeBusinessPost) {
    return this._updateRequest<TentativeBusinessPost, TentativeBusiness>(
      'tentativeBiz/updateSpecificBiz',
      tb
    );
  }

  // UPLOAD
  upload(data: FormData) {
    // return of({
    //   etag: '22a4eb595a02296c7fec40408f36d72c',
    //   id: '6044659091ce8fa53d548f4f',
    //   key: '1615095182-Test.pdf',
    //   location:
    //     'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //   uploadedToS3: true,
    // });

    // return of({
    //   etag: '58fdf64c2dd3a7120ac2c2ba53acc718',
    //   id: '6045a82791ce8fa53d548f58',
    //   key: '1615177765-cat.jpg',
    //   location:
    //     'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615177765-cat.jpg',
    //   uploadedToS3: true,
    // });

    return this.http
      .post<Upload>('http://3.13.186.200:9000/uploadfile', data)
      .pipe(timeout(this._timeout), catchError(errorHandler));
  }

  /*PHONE VERIFICATION LOGIC
  For MCA Profile Creation the endpoint for code verifications is '/mcaProfile/verifySentCode'
  For Account creation the endpoint for code verification is '/akuru/verifyCode'
  For Personnel profile creation the endpoint for code verification is '/personnel/verifySentCode'
  */

  // VERIFICATION
  verifyAccount(form: any): Observable<any> {
    return this.http
      .put(this._baseUrl + 'akuru/verifyCode', undefined, { params: form })
      .pipe(catchError(errorHandler));
  }

  verifyMca(form: any): Observable<any> {
    return this.http
      .post(this._baseUrl + 'mcaProfile/verifySentCode', undefined, {
        params: form,
      })
      .pipe(catchError(errorHandler));
  }

  verifyPersonnel(form: any): Observable<any> {
    return this.http
      .post(this._baseUrl + 'personnel/verifySentCode', undefined, {
        params: form,
      })
      .pipe(catchError(errorHandler));
  }

  // ACCOUNT
  createAccount(
    form: any
  ): Observable<
    ApiResponse<{ message: string; request_id: string; userId: string }>
  > {
    return this.http
      .post<
        ApiResponse<{ message: string; request_id: string; userId: string }>
      >(this._baseUrl + 'akuru/create', undefined, { params: form })
      .pipe(catchError(errorHandler));
  }

  login(form: {
    username: string;
    password: string;
    group: string;
  }): Observable<{ token: string; id: string }> {
    return this.http
      .get<{ token: string; id: string }>(this._baseUrl + 'akuru/login', {
        params: form,
      })
      .pipe(catchError(errorHandler));
  }

  changePassword(form: {
    username: string;
    password: string;
  }): Observable<{
    success: { message: string; request_id: string; userId: string };
  }> {
    return this.http
      .get<{
        success: { message: string; request_id: string; userId: string };
      }>(this._baseUrl + 'akuru/changePassword', {
        params: form,
      })
      .pipe(catchError(errorHandler));
  }

  updatePassword(form: any) {
    return this.http
      .put(this._baseUrl + 'akuru/updatePassword', {
        params: form,
      })
      .pipe(catchError(errorHandler));
  }
}
