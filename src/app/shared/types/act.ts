export interface ActPost {
  titleOfAct: string;
  actNo: string;
  actsSignature: string;
  datePublished: string;
  uploaded: boolean;
  uploadedFileURL: string;
  uploadAccount: string;
  approvingAcc: string;
  originatingBTitle: string;
  orderPaperId: string;
  sponsorId: string;
  concernedCommiteeId: string;
  relatedTo: string;
  assemblyId: string;
  published: string;
  sponsorName: string;
  uploadId: string;
  approvingAccId: string;
  billId: string;
  committeeName: string;
  committeeNameId: string;
  publishStatus: string;
}

export interface Act {
  _id: string;
  actNo: number;
  actsSignature: string;
  approvingAccount: { approvingAcc: string; approvingAccId: string };
  assemblyId: string;
  concernedCommiteeId: { committeeName: string; committeeNameId: string };
  createdAt: string;
  datePublished: string;
  orderPaperId: string;
  originatingBillId: { originatingBTitle: string; originatingBId: string };
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  relatedTo: string;
  sponsorId: { sponsorName: string; sponsorId: string };
  titleOfAct: string;
  updatedAt: string;
  uploaded: boolean;
  uploadedFileURL: string;
  uploadingAccount: { uploadAccount: string; uploadId: string };
}
