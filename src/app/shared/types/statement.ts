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

export interface Statement {
  _id: string;
  approvingAccount: {
    account: string;
    approverId: string;
  };
  assemblyId: string;
  createdAt: string;
  datePublished: string;
  dateStatementSought: string;
  dateStatementToResponded: string;
  departmentResponsible: string;
  publishState: string;
  published: boolean;
  seeker: {
    id: string;
    name: string;
    position: string;
  };
  statementNo: number;
  statementProvider: {
    department: string;
    id: string;
    name: string;
  };
  statementSignature: string;
  status: string;
  subjectOfStatement: string;
  updatedAt: string;
  uploaded: boolean;
  uploadedFileURL: string;
}
