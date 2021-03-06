export class Department {
  _id: string;
  assemblyId: string;
  createdAt: string;
  members: string[];
  name: string;
  published: boolean;
  updatedAt: string;
}

export class DepartmentPost {
  name: string;
  assemblyId: string;
  published: boolean;
  members: string[];
}
