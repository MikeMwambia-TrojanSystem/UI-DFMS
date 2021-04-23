import { BasicDocument } from './_global';

export class Department extends BasicDocument {
  _id: string;
  assemblyId: string;
  authorName: string;
  createdAt: string;
  members: string[];
  name: string;
  publishState: 'draft' | 'published';
  published: boolean;
  updatedAt: string;
}

export class DepartmentPost {
  name: string;
  assemblyId: string;
  published: boolean;
  members: string[];
}
