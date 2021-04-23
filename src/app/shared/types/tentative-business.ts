import { BasicDocument } from './_global';

export class TentativeBusinessPost {
  date: string;
  time: string;
  tentativeSignature: string;
  assemblyId: string;
  datePublished: string;
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  orderPaperNo: string;
  petitionId: string[];
  reportId: string[];
  statementId: string[];
  motionId: string[];
  motionNoticeId: string[];
  billsId: string[];
}

export class TentativeBusiness extends BasicDocument {
  author: string;
  authorName: string;
  bills: string[];
  canApprove: boolean;
  canDelete: boolean;
  canEdit: boolean;
  createdAt: string;
  dateOfContent: string;
  dayOfContent: string;
  motions: string[];
  noticeOfMotions: string[];
  orderPaperId: string;
  papers: string[];
  petitions: string[];
  published: boolean;
  publishState: 'draft' | 'private' | 'public';
  statements: string[];
  timeOfContent: string;
  updatedAt: string;
  _id: string;
}

export class TentativeBusinessWithOrderNumber extends TentativeBusiness {
  orderPaperNo: number;
}
