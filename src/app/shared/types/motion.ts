export class MotionPost {
  motionSignature: string;
  content: string;
  sponsorName: string;
  sponsorId: string;
  relatedTo: string;
  department: string;
  resolution: string;
  assemblyId: string;
  approver: string;
  approverId: string;
  datePublished: string;
  published: string;
}

export class Motion {
  _id: string;
  motionSignature: string;
  content: string;
  sponsoredBy: {
    sponsorName: string;
    sponsorId: string;
  };
  department: string;
  resolution: string;
  relatedTo: string;
  orderPaperId: string;
  assemblyId: string;
  approvingAccount: {
    name: string;
    id: string;
  };
  datePublished: string;
  published: true;
  createdAt: string;
  updatedAt: string;
}
