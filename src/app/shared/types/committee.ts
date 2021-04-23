import { BasicDocument } from './_global';

export class CommitteePost {
  committeeSignature: string;
  name: string;
  Chairname: string;
  chairId: string;
  viceChair: string;
  viceChairId: string;
  committesMembers: string;
  departmentInExcecutive: string;
  approverId: string;
  account: string;
  datePublished: string;
  published: string;
  assemblyId: string;
}

export class Committee extends BasicDocument {
  approvingAccount: {
    approverId: string;
    account: string;
  };
  assemblyId: string;
  authorName: string;
  chair: {
    name: string;
    id: string;
  };
  commiteeSignature: string;
  committesMembers: string[];
  createdAt: string;
  datePublished: string;
  departmentInExcecutive: string;
  name: string;
  publishState: 'draft' | 'published';
  published: boolean;
  viceChair: {
    name: string;
    id: string;
  };
  _id: string;
  // Missing not important
  updatedAt: string;
}
