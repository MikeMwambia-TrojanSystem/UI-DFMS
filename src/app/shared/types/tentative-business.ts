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
  _id: string;
  published: boolean;
  publishState: 'draft' | 'private' | 'public';
}
