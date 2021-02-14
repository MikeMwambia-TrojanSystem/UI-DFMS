export class CommitteePost {
  committeeSignature: string;
  name: string;
  Chairname: string;
  chairId: string;
  viceChair: string;
  viceChairId: string;
  committeesMembers: string;
  departmentInExecutive: string;
  approverId: string;
  account: string;
  datePublished: string;
  published: string;
  assemblyId: string;
}

export class Committee {
  committeesMembers: string[];
  _id: string;
  commiteeSignature: string;
  name: string;
  chair: {
    name: string;
    id: string;
  };
  viceChair: {
    name: string;
    id: string;
  };
  departmentInExecutive: string;
  approvingAccount: {
    approverId: string;
    account: string;
  };
  datePublished: string;
  published: boolean;
  assemblyId: string;
  createdAt: string;
  updatedAt: string;
}
