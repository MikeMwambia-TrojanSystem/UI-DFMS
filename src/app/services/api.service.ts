import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
import { Report, ReportPost } from '../shared/types/report';
import { PhoneVerification } from '../shared/types/verification';
import { OrderPaper, OrderPaperPost } from '../shared/types/order-paper';
import { Votebook, VotebookPost } from '../shared/types/votebook';
import { Speaker } from '../shared/types/speaker';

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

  // GETs
  private _getRequest<T>(endpoint: string) {
    return this.http
      .get<ApiResponse<T[] | string>>(this._baseUrl + endpoint)
      .pipe(timeout(this._timeout), catchError(errorHandler));
  }

  getCommittees(): Observable<ApiResponse<Committee[] | string>> {
    // return of({
    //   message: [
    //     {
    //       committesMembers: ['123'],
    //       _id: '123',
    //       commiteeSignature: '123',
    //       name: 'Tets Name',
    //       chair: {
    //         name: 'Test Chair',
    //         id: '123',
    //       },
    //       viceChair: {
    //         name: 'Test Vice',
    //         id: '1234',
    //       },
    //       departmentInExcecutive: 'test Depart',
    //       approvingAccount: {
    //         approverId: '123',
    //         account: 'test',
    //       },
    //       datePublished: '2020-03-01',
    //       published: true,
    //       assemblyId: '123',
    //       createdAt: '2020-03-01',
    //       updatedAt: '2020-03-01',
    //     },
    //   ],
    //   success: true,
    //   status: 200,
    // });
    return this._getRequest<Committee>('commitee/getAllCommitees');
  }

  getMotions(): Observable<ApiResponse<Motion[] | string>> {
    // return of({
    //   message: [
    //     {
    //       _id: '1',
    //       motionSignature: '1',
    //       content: 'content',
    //       sponsoredBy: {
    //         sponsorName: 'sponsor name',
    //         sponsorId: '1',
    //       },
    //       department: 'test department',
    //       resolution: 'test resolution',
    //       relatedTo: 'test related',
    //       assemblyId: '123',
    //       approvingAccount: {
    //         name: 'name',
    //         id: '123',
    //       },
    //       datePublished: '2021-03-01',
    //       publishState: 'public',
    //       createdAt: '2021-03-01',
    //       updatedAt: '2021-03-01',
    //     },
    //   ],
    //   status: 200,
    //   success: true,
    // });
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

  getStatements(): Observable<ApiResponse<Statement[] | string>> {
    // return of({
    //   message: [
    //     {
    //       _id: '1',
    //       approvingAccount: {
    //         account: 'test',
    //         approverId: '123',
    //       },
    //       assemblyId: '123',
    //       createdAt: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       dateStatementSought: '2021-03-01',
    //       dateStatementToResponded: '2021-03-01',
    //       departmentResponsible: 'test department',
    //       publishState: 'public',
    //       published: true,
    //       seeker: {
    //         id: '123',
    //         name: 'test',
    //         position: 'speaker',
    //       },
    //       statementNo: 1,
    //       statementProvider: {
    //         department: 'test department',
    //         id: '1',
    //         name: 'test department',
    //       },
    //       statementSignature: '123',
    //       status: 'public',
    //       subjectOfStatement: 'test',
    //       updatedAt: '2021-03-01',
    //       uploaded: true,
    //       uploadedFileURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //     },
    //   ],
    //   status: 200,
    //   success: true,
    // });
    return this._getRequest<Statement>('statement/getAllStatements');
  }

  getPetitions(): Observable<ApiResponse<string | Petition[]>> {
    // return of({
    //   message: [
    //     {
    //       _id: '1',
    //       approvingAccount: { approverId: '123', account: '123' },
    //       assemblyId: '123',
    //       concernedCommitee: { name: 'test', id: '123' },
    //       content: 'content',
    //       createdAt: '2021-03-02',
    //       dateCommitteResponse: '2021-03-02',
    //       datePresented: '2021-03-02',
    //       datePublished: '2021-03-02',
    //       dateToBDiscussed: '2021-03-02',
    //       orderPaperId: '1',
    //       petitionNumber: 1,
    //       petitionSignature: 'test',
    //       petitionTitle: 'test title',
    //       petitioners: [
    //         'name=test|||phone=254123123123',
    //         'name=test2|||phone=254123123123',
    //       ],
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test',
    //       sponsoredBy: { sponsorName: 'test', sponsorId: '123' },
    //       updatedAt: '2021-03-02',
    //       uploaded: true,
    //       uploadedFileURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: { name: 'test', id: '1' },
    //     },
    //     {
    //       _id: '2',
    //       approvingAccount: { approverId: '123', account: '123' },
    //       assemblyId: '123',
    //       concernedCommitee: { name: 'test', id: '123' },
    //       content: 'content',
    //       createdAt: '2021-03-02',
    //       dateCommitteResponse: '2021-03-02',
    //       datePresented: '2021-03-02',
    //       datePublished: '2021-03-02',
    //       dateToBDiscussed: '2021-03-02',
    //       orderPaperId: '1',
    //       petitionNumber: 1,
    //       petitionSignature: 'test',
    //       petitionTitle: 'test title',
    //       petitioners: [
    //         'name=test|||phone=254123123123',
    //         'name=test2|||phone=254123123123',
    //       ],
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test',
    //       sponsoredBy: { sponsorName: 'test', sponsorId: '123' },
    //       updatedAt: '2021-03-02',
    //       uploaded: true,
    //       uploadedFileURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: { name: 'test', id: '1' },
    //     },
    //   ],
    //   success: true,
    //   status: 200,
    // });
    return this._getRequest<Petition>('petition/getAllPetition');
  }

  getBills(): Observable<ApiResponse<Bill[] | string>> {
    // return of({
    //   message: [
    //     {
    //       _id: '1',
    //       approvingAccount: { approvingAcc: 'test', approvingAccId: '123' },
    //       assemblyId: '123',
    //       billNo: 1,
    //       billSignature: '123',
    //       billUploadedReportURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       concernedCommiteeId: { committeeName: 'test', committeeNameId: '1' },
    //       createdAt: '2021-03-01',
    //       datePassed: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       firstReadingDate: '2021-03-01',
    //       orderPaperId: '123',
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test related',
    //       secondReadingDate: '2021-03-01',
    //       sponsor: { name: 'sponsor name', id: '1' },
    //       status: 'published',
    //       titleOfBill: 'title bill',
    //       updatedAt: '2021-03-01',
    //       uploaded: true,
    //       uploadedBillURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: {
    //         uploadAccname: 'test',
    //         uploadingPersonnel: 'test',
    //       },
    //     },
    //     {
    //       _id: '2',
    //       approvingAccount: { approvingAcc: 'test', approvingAccId: '123' },
    //       assemblyId: '123',
    //       billNo: 2,
    //       billSignature: '123',
    //       billUploadedReportURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       concernedCommiteeId: { committeeName: 'test', committeeNameId: '1' },
    //       createdAt: '2021-03-01',
    //       datePassed: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       firstReadingDate: '2021-03-01',
    //       orderPaperId: '123',
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test related',
    //       secondReadingDate: '2021-03-01',
    //       sponsor: { name: 'sponsor name', id: '1' },
    //       status: 'published',
    //       titleOfBill: 'title bill 2',
    //       updatedAt: '2021-03-01',
    //       uploaded: true,
    //       uploadedBillURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: {
    //         uploadAccname: 'test',
    //         uploadingPersonnel: 'test',
    //       },
    //     },
    //     {
    //       _id: '3',
    //       approvingAccount: { approvingAcc: 'test', approvingAccId: '123' },
    //       assemblyId: '123',
    //       billNo: 3,
    //       billSignature: '123',
    //       billUploadedReportURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       concernedCommiteeId: { committeeName: 'test', committeeNameId: '1' },
    //       createdAt: '2021-03-01',
    //       datePassed: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       firstReadingDate: '2021-03-01',
    //       orderPaperId: '123',
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test related',
    //       secondReadingDate: '2021-03-01',
    //       sponsor: { name: 'sponsor name', id: '1' },
    //       status: 'published',
    //       titleOfBill: 'title bill 3',
    //       updatedAt: '2021-03-01',
    //       uploaded: true,
    //       uploadedBillURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: {
    //         uploadAccname: 'test',
    //         uploadingPersonnel: 'test',
    //       },
    //     },
    //   ],
    //   status: 200,
    //   success: true,
    // });
    return this._getRequest<Bill>('bills/getAllBills');
  }

  getActs(): Observable<ApiResponse<Act[] | string>> {
    // return of({
    //   message: [
    //     {
    //       _id: '123',
    //       actNo: 1,
    //       actsSignature: '123',
    //       approvingAccount: { approvingAcc: 'test', approvingAccId: '123' },
    //       assemblyId: '123',
    //       concernedCommiteeId: {
    //         committeeName: 'test',
    //         committeeNameId: '123',
    //       },
    //       createdAt: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       orderPaperId: '123',
    //       originatingBillId: {
    //         originatingBTitle: 'title bill',
    //         originatingBId: '1',
    //       },
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test related',
    //       sponsorId: { sponsorName: 'test', sponsorId: '123' },
    //       titleOfAct: 'title',
    //       updatedAt: '2021-03-01',
    //       uploaded: true,
    //       uploadedFileURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: { uploadAccount: 'test', uploadId: '123' },
    //     },
    //   ],
    //   success: true,
    //   status: 200,
    // });
    return this._getRequest<Act>('acts/getAllActs');
  }

  getPersonnels(): Observable<ApiResponse<Personnel[] | string>> {
    // return of({
    //   message: [
    //     {
    //       _id: '1',
    //       assemblyId: '123',
    //       createdAt: '2021-03-01',
    //       dateCreated: '2021-03-01',
    //       department: { name: 'test', id: '123' },
    //       educationLevel: 'Diploma Graduate',
    //       group: 'group',
    //       name: 'name 1',
    //       phoneNumber: {
    //         phoneNumber: '254123123123',
    //         verified: 'true',
    //         request_id: '123',
    //       },
    //       profilePic:
    //         'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    //       signature: '123',
    //       status: true,
    //       termOfService: 'Permanent',
    //       updatedAt: '2021-03-01',
    //     },
    //     {
    //       _id: '2',
    //       assemblyId: '123',
    //       createdAt: '2021-03-01',
    //       dateCreated: '2021-03-01',
    //       department: { name: 'test', id: '123' },
    //       educationLevel: 'Diploma Graduate',
    //       group: 'group',
    //       name: 'name 2',
    //       phoneNumber: {
    //         phoneNumber: '254123123123',
    //         verified: 'true',
    //         request_id: '123',
    //       },
    //       profilePic:
    //         'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    //       signature: '123',
    //       status: true,
    //       termOfService: 'Permanent',
    //       updatedAt: '2021-03-01',
    //     },
    //   ],
    //   status: 200,
    //   success: true,
    // });
    return this._getRequest<Personnel>('personnel/getAllPersonnel');
  }

  getReports(): Observable<ApiResponse<Report[] | string>> {
    // return of({
    //   message: [
    //     {
    //       _id: '123',
    //       annexus: {
    //         name: '1615095182-Test.pdf',
    //         id: '1',
    //         uploaded: 'true',
    //         uploadingUrl:
    //           'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       },
    //       approvingAccount: {
    //         approverId: '123',
    //         account: 'test',
    //       },
    //       assemblyId: '123',
    //       authorCommitee: {
    //         name: 'author name',
    //         id: '123',
    //       },
    //       content: [
    //         {
    //           pageNo: '1',
    //           content: 'page content',
    //           author: 'author name',
    //         },
    //       ],
    //       createdAt: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       dueDate: '2021-03-01',
    //       editors: ['1', '2'],
    //       orderPaperId: '123',
    //       originatingDocument: { type: 'bill', id: '1' },
    //       publishState: 'public',
    //       published: true,
    //       relatedTo: 'test related',
    //       reportSignature: '123',
    //       titleOfReport: 'title',
    //       updatedAt: '2021-03-01',
    //       uploaded: true,
    //       uploadedFileURL:
    //         'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //       uploadingAccount: { name: 'test', id: '123' },
    //     },
    //   ],
    //   status: 200,
    //   success: true,
    // });
    return this._getRequest<Report>('report/getAllReports');
  }

  getOrderPaper(): Observable<ApiResponse<OrderPaper[] | string>> {
    // return of({
    //   message: [
    //     {
    //       adjournment: 'ADJOURNMENT',
    //       adminstrationOfOath: [
    //         'name=test1|||ward=ward|||passport=https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615177765-cat.jpg|||politicalParty=party',
    //       ],
    //       approvingAccount: { account: 'test', approverId: '123' },
    //       assemblyId: '123',
    //       assemblyNo: 1,
    //       bills: ['1', '2'],
    //       communicationFromChainr: [
    //         '<p>test content 1</p>',
    //         '<p>Test content 2</p>',
    //       ],
    //       createdAt: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       messages: [
    //         {
    //           content: 'test content',
    //           source: 'testsource',
    //           uploadedLocation:
    //             'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //         },
    //         {
    //           content: 'test content',
    //           source: 'testsource',
    //           uploadedLocation:
    //             'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //         },
    //       ],
    //       motions: ['1'],
    //       noticeOfMotions: ['1'],
    //       orderPaperNo: 1,
    //       orderPaperSignature: '123',
    //       pageNoToDate: 1,
    //       papers: [],
    //       petitions: ['1', '2'],
    //       publishState: 'public',
    //       published: true,
    //       sessionNo: 1,
    //       statements: ['1'],
    //       updatedAt: '2021-03-01',
    //       _id: '1',
    //     },
    //     {
    //       adjournment: 'ADJOURNMENT',
    //       adminstrationOfOath: [
    //         'name=test1|||ward=ward|||passport=https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615177765-cat.jpg|||politicalParty=party',
    //       ],
    //       approvingAccount: { account: 'test', approverId: '123' },
    //       assemblyId: '123',
    //       assemblyNo: 1,
    //       bills: ['1', '2'],
    //       communicationFromChainr: [
    //         '<p>test content 1</p>',
    //         '<p>Test content 2</p>',
    //       ],
    //       createdAt: '2021-03-01',
    //       datePublished: '2021-03-01',
    //       messages: [
    //         {
    //           content: 'test content',
    //           source: 'testsource',
    //           uploadedLocation:
    //             'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //         },
    //         {
    //           content: 'test content',
    //           source: 'testsource',
    //           uploadedLocation:
    //             'https://testploadsdocumentsjoniki.s3.us-east-2.amazonaws.com/1615095182-Test.pdf',
    //         },
    //       ],
    //       motions: ['1'],
    //       noticeOfMotions: ['1'],
    //       orderPaperNo: 1,
    //       orderPaperSignature: '123',
    //       pageNoToDate: 1,
    //       papers: [],
    //       petitions: ['1', '2'],
    //       publishState: 'draft',
    //       published: false,
    //       sessionNo: 1,
    //       statements: 'NONE',
    //       updatedAt: '2021-03-01',
    //       _id: '2',
    //     },
    //   ],
    //   status: 200,
    //   success: true,
    // });
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

  // VERIFICATION
  phoneVerification(verification: PhoneVerification): Observable<any> {
    // return of(true);
    return this.http
      .put(this._baseUrl + 'mobile/verifyVerificationCode', undefined, {
        params: verification as any,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error');
          return throwError(error);
        })
      );
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

  verifyAccount(form: any): Observable<any> {
    return this.http
      .post(this._baseUrl + 'akuru/verifyCode', undefined, { params: form })
      .pipe(catchError(errorHandler));
  }

  login(form: {
    username: string;
    password: string;
    group: string;
  }): Observable<any> {
    return this.http
      .get(this._baseUrl + 'akuru/login', { params: form })
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
      .get(this._baseUrl + 'akuru/updatePassword', {
        params: form,
      })
      .pipe(catchError(errorHandler));
  }
}
