export class Department {
  _id: string;
  name: string;
  county: string;
  subCounty: string;
  constituency: string;
  assemblyId: string;
  type: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export class DepartmentPost {
  name: string;
  assemblyId: string;
}
