export class BillPost {
  titleOfBill: string;
  billNo: string;
  billSignature: string;
  datePublished: string;
  firstReadingDate: string;
  secondReadingDate: string;
  datePassed: string;
  uploaded: boolean;
  uploadedBillURL: string;
  approvingAcc: string;
  orderPaperId: string;
  sponsorId: string;
  sponsor: string;
  relatedTo: string;
  assemblyId: string;
  published: boolean;
  approvingAccId: string;
  committeeName: string;
  committeeNameId: string;
  billUploadedReportURL: string;
  status: string;
  uploadingPersonnel: string;
  publishStatus: string;
}

export class Bill {
  _id: string;
  approvingAccount: { approvingAcc: string; approvingAccId: string };
  assemblyId: string;
  billNo: number;
  billSignature: string;
  billUploadedReportURL: string;
  concernedCommiteeId: { committeeName: string; committeeNameId: string };
  createdAt: string;
  datePassed: string;
  datePublished: string;
  firstReadingDate: string;
  orderPaperId: string;
  publishState: 'draft' | 'private' | 'public';
  published: boolean
  relatedTo: string;
  secondReadingDate: string;
  sponsor: { name: string; id: string }
  status: string;
  titleOfBill: string;
  updatedAt: string;
  uploaded: true
  uploadedBillURL: string;
  uploadingAccount: { uploadAccname: string, uploadingPersonnel: string }
}
