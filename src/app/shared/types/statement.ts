import { BasicDocument } from './_global';

export interface StatementPost {
  number: string;
  seeking: string;
  subject: string;
  dateSought: string;
  dateResponse: string;
  requestTo: string;
  department: string;
  statement: string;
}

export interface Statement extends BasicDocument {
  approvingAccount: {
    account: string;
    approverId: string;
  };
  assemblyId: string;
  authorName: string;
  approver: string;
  createdAt: string;
  datePublished: string;
  dateStatementSought: string;
  dateStatementToResponded: string;
  departmentResponsible: string;
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  seeker: {
    name: string;
    id: string;
  };
  seekerDescription: string;
  statementProvider: {
    name: string;
    department: string;
    id: string;
  };
  statementSignature: string;
  status: string;
  subjectOfStatement: string;
  title: string;
  updatedAt: string;
  uploaded: true;
  uploadedFileURL: string;
  uploadingAccount: {
    name: string;
    id: string;
  };
  _id: string;
}

// export interface Statement extends BasicDocument {
//   _id: string;
//   approvingAccount: {
//     account: string;
//     approverId: string;
//   };
//   assemblyId: string;
//   createdAt: string;
//   datePublished: string;
//   dateStatementSought: string;
//   dateStatementToResponded: string;
//   departmentResponsible: string;
//   publishState: string;
//   published: boolean;
//   seeker: {
//     id: string;
//     name: string;
//     position: string;
//   };
//   statementNo: number;
//   statementProvider: {
//     department: string;
//     id: string;
//     name: string;
//   };
//   statementSignature: string;
//   status: string;
//   subjectOfStatement: string;
//   updatedAt: string;
//   uploaded: boolean;
//   uploadedFileURL: string;
// }
