import { BasicDocument } from './_global';

export class OrderPaperPost {
  orderPaperSignature: string;
  assemblyId: string;
  datePublished: string;
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  approvingAccount: string;
  approverId: string;
  assemblyNo: number;
  sessionNo: number;
  orderPaperNo: number;
  pageNoToDate: number;
  chair: string;
  adminContent: string;
  communContent: string;
  messages: string;
  petitionId: string;
  reportId: string;
  statementId: string;
  motionId: string;
  motionNoticeId: string;
  billsId: string;
  adjournment: string;
}

export class Message {
  content: string;
  source: string;
  uploadedLocation: string;
}

export class OrderPaper extends BasicDocument {
  adjournment: string;
  adminstrationOfOath: string[];
  approvingAccount: { account: string; approverId: string };
  assemblyNo: number;
  author: string;
  bills: string[];
  communicationFromChainr: string[];
  createdAt: string;
  datePublished: string;
  messages: Message[];
  motions: string[];
  noticeOfMotions: string[];
  orderPaperNo: number;
  pageNoToDate: number;
  papers: string[];
  petitions: string[];
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  sessionNo: number;
  statements: string[];
  _id: string;
}

// export class OrderPaper extends BasicDocument {
//   adjournment: string;
//   adminstrationOfOath: string[] | 'NONE';
//   approvingAccount: { account: string; approverId: string };
//   assemblyId: string;
//   assemblyNo: number;
//   bills: string[] | 'NONE';
//   communicationFromChainr: string[] | 'NONE';
//   createdAt: string;
//   datePublished: string;
//   messages: Message[] | 'NONE';
//   motions: string[] | 'NONE';
//   noticeOfMotions: string[] | 'NONE';
//   orderPaperNo: number;
//   orderPaperSignature: string;
//   pageNoToDate: number;
//   papers: string[] | 'NONE';
//   petitions: string[] | 'NONE';
//   publishState: 'draft' | 'private' | 'public';
//   published: boolean;
//   sessionNo: number;
//   statements: string[] | 'NONE';
//   updatedAt: string;
//   _id: string;
// }
