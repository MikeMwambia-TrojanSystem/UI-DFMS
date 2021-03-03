export class McaEmployee {
  _id: string;
  assemblyId: string;
  commiteesInvolved: string[];
  group: string;
  name: string;
  phoneNumber: {
    number: string;
    verified: string;
  };
  politicalParty: string;
  positionStatus: string;
  profilePic: string;
  signature: string;
  status: boolean;
  termOfService: string;
  dateCreated: string;
  ward: {
    wardId: string;
    wardName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export class McaPost {
  name: string;
  category: string;
  position: string;
  termStart: string;
  termEnd: string;
  politicalParty: string;
  phone: string;
  profilePic: string;
}
