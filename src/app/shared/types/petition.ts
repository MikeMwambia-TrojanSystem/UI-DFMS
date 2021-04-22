import { BasicDocument } from './_global';

export class PetitionPost {
  petitionSignature: string;
  content: string;
  sponsorName: string;
  department: string;
  relatedTo: string;
  orderPaperId: string;
  assemblyId: string;
  approver: string;
  datePublished: string;
  published: boolean;
  sponsorId: string;
  approverId: string;
  petitionTitle: string;
  account: string;
  concernedCommitee: string;
  concernedCommiteeId: string;
  dateCommitteResponse: string;
  datePresented: string;
  dateToBDiscussed: string;
  petioners: string;
  uploaded: boolean;
  uploadedFileURL: string;
  uploader: string;
  uploaderId: string;
  petitionNumber: string;
}

export class Petition extends BasicDocument {
  approvingAccount: { approverId: string; account: string };
  assemblyId: string;
  concernedCommitee: { name: string; id: string };
  content: string;
  createdAt: string;
  dateCommitteResponse: string;
  datePresented: string;
  datePublished: string;
  dateToBDiscussed: string;
  orderPaperId: string;
  petitionNumber: number;
  petitionSignature: string;
  petitioners: string[];
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  relatedTo: string;
  sponsoredBy: { sponsorName: string; sponsorId: string };
  title: string;
  updatedAt: string;
  uploaded: boolean;
  uploadedFileURL: string;
  uploadingAccount: { uploadAccount: string; uploadId: string };
  _id: string;
}
