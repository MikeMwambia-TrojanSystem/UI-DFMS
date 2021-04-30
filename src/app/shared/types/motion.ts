import { BasicDocument } from './_global';

export class MotionPost {
  motionSignature: string;
  content: string;
  sponsorName: string;
  sponsorId: string;
  relatedTo: string;
  department: string;
  resolution: string;
  noticeOfMotion: string;
  assemblyId: string;
  approver: string;
  approverId: string;
  datePublished: string;
  published: string;
}

export class Motion extends BasicDocument {
  _id: string;
  author: string;
  authorName: string;
  approver: string;
  createdAt: string;
  datePublished: string;
  department: string;
  noticeOfMotion: boolean;
  publishState: 'draft' | 'private' | 'public';
  published: boolean;
  relatedTo: string;
  resolution: string;
  sponsoredBy: {
    sponsorName: string;
    sponsorId: string;
  };
  title: string;
  updatedAt: string;
}
// export class Motion extends BasicDocument {
//   _id: string;
//   motionSignature: string;
//   content: string;
//   sponsoredBy: {
//     sponsorName: string;
//     sponsorId: string;
//   };
//   department: string;
//   resolution: string;
//   noticeOfMotion: boolean;
//   relatedTo: string;
//   assemblyId: string;
//   approvingAccount: {
//     name: string;
//     id: string;
//   };
//   datePublished: string;
//   publishState: 'public' | 'private' | 'draft';
//   createdAt: string;
//   updatedAt: string;
// }
