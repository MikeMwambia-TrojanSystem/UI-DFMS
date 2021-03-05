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
  group: string;
  phoneNumber: string;
  verified: boolean;
  dateCreated: string;
  assemblyId: string;
  profilePic: string;
  termOfService: string;
  positionStatus: string;
  politicalParty: string;
  ward: string;
  signature: string;
  status: string;
  wardId: string;
}
