import { BasicDocument } from './_global';

export class VotebookPost {
  datePublished: string;
  approvingAccount: string;
  approverId: string;
  published: boolean;
  publishState: string;
  voteBookSignature: string;
  orderPaperId: string;
  assemblyId: string;
  assemblyNo: string;
  orderPapersNo: string;
  pageNoToDate: string;
  sessionNo: string;
  votebookNo: number;
  adminstrationOfOathReply: string;
  communicationFromChainr: string;
  messageContent: string;
  petionReply: string;
  reportReply: string;
  noticeOfMotionsReply: string;
  statementReply: string;
  motions: string;
  bills: string;
  adjournment: string;
}

// export class Votebook extends BasicDocument {
//   adjournment: string;
//   adminstrationOfOath: string[];
//   assemblyId: string;
//   assemblyNo: number;
//   author: string;
//   bills: { content: string; source: string; documentId: string }[];
//   communicationFromChainr: string[];
//   datePublished: string;
//   messages: string[];
//   motions: { content: string; source: string; documentId: string }[];
//   noticeOfMotions: string[];
//   orderPapersNo: number;
//   papers: string[];
//   petitions: string[];
//   publishState: 'draft' | 'private' | 'public';
//   published: boolean;
//   sessionNo: number;
//   statements: string[];
//   _id: string;
// }

export class Votebook extends BasicDocument {
  adjournment: string;
  adminstrationOfOath: string[];
  approvingAccount: { account: string; approverId: string };
  assemblyId: string;
  assemblyNo: number;
  bills: { content: string; source: string; documentId: string }[];
  communicationFromChainr: string[];
  createdAt: string;
  datePublished: string;
  messages: string[];
  motions: { content: string; source: string; documentId: string }[];
  noticeOfMotions: string[];
  orderPapersNo: number;
  papers: string[];
  petitions: string[];
  publishState: 'draft';
  published: boolean;
  sessionNo: number;
  statements: string[];
  updatedAt: string;
  voteBookSignature: string;
  votebookNo: number;
  presiding: {
    name: string;
    position: string;
    id: string;
  };
  _id: string;
}
