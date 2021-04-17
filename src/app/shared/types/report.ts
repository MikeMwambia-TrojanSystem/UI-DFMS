import { BasicDocument } from './_global';

export class ReportPost {
  reportSignature: string;
  titleOfReport: string;
  authorCommitee: string;
  authorCommiteeId: string;
  dueDate: string;
  originatingDocType: string;
  originatingDocTypeId: string;
  editors: string;
  pageNo: string;
  content: string;
  author: string;
  uploaded: boolean;
  uploadedFileURL: string;
  uploadingAccount: string;
  uploaderId: string;
  account: string;
  approverId: string;
  annexusName: string;
  annexusId: string;
  uploadedAnexux: boolean;
  uploadingUrl: string;
  datePublished: string;
  orderPaperId: string;
  relatedTo: string;
  assemblyId: string;
  published: boolean;
  publishStatus: string;
}

export class Report extends BasicDocument {
  _id: string;
  annexus: { name: string; id: string; uploaded: string; uploadingUrl: string };
  approvingAccount: {
    approverId: string;
    account: string;
  };
  // assemblyId: string;
  authorCommitee: {
    name: string;
    id: string;
  };
  // content: [
  //   {
  //     pageNo: string;
  //     content: string;
  //     author: string;
  //   }
  // ];
  // createdAt: string;
  datePublished: string;
  dueDate: string;
  editors: string[];
  // orderPaperId: string;
  originatingDocument: { type: string; id: string };
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  relatedTo: string;
  // reportSignature: string;
  title: string;
  // updatedAt: string;
  // uploaded: boolean;
  uploadedFileURL: string;
  uploadingAccount: { name: string; id: string };
}
