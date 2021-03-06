export class PersonnelPost {
  name: string;
  group: string;
  phoneNumber: string;
  dateCreated: string;
  assemblyId: string;
  profilePic: string;
  termOfService: string;
  signature: string;
  status: boolean;
  verified: boolean;
  educationLevel: string;
  deparment: string;
}

export class Personnel {
  _id: string;
  assemblyId: string;
  createdAt: string;
  dateCreated: string;
  department: { name: string; id: string };
  educationLevel:
    | 'Diploma Graduate'
    | "Bachelor's Graduate"
    | "Master's Graduate";
  group: string;
  name: string;
  phoneNumber: { phoneNumber: string; verified: string; request_id: string };
  profilePic: string;
  signature: string;
  status: boolean;
  termOfService: 'Permanent' | 'Contract' | 'Outsourced';
  updatedAt: string;
}
