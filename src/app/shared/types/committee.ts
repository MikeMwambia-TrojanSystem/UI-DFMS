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
  _id: string;
  approvingAccount: {
    approverId: string;
    account: string;
  };
  chair: {
    name: string;
    id: string;
  };
  committesMembers: string[];
  createdAt: string;
  datePublished: string;
  departmentInExcecutive: string;
  name: string;
  viceChair: {
    name: string;
    id: string;
  };
}

// export class Committee extends BasicDocument {
//   committesMembers: string[];
//   _id: string;
//   commiteeSignature: string;
//   name: string;
//   chair: {
//     name: string;
//     id: string;
//   };
//   viceChair: {
//     name: string;
//     id: string;
//   };
//   departmentInExcecutive: string;
//   approvingAccount: {
//     approverId: string;
//     account: string;
//   };
//   datePublished: string;
//   published: boolean;
//   assemblyId: string;
//   createdAt: string;
//   updatedAt: string;
// }
