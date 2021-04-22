import { BasicDocument } from './_global';

export class WardConSub {
  assemblyId: string;
  constituency?: string;
  createdAt: string;
  name: string;
  published: boolean;
  publishState: 'draft' | 'published';
  subCounty?: string;
  type: 'subcounty' | 'constituency' | 'ward';
  _id: string;
  // Missing not important
  updatedAt: string;
  // county?: string;
  // date: string;
}

export class WardConSubPost extends BasicDocument {
  name: string;
  type: 'subcounty' | 'constituency' | 'ward';
  date: string;
  assemblyId: string;
  subCounty?: string;
  constituency?: string;
  published: boolean;
}

export class Ward extends WardConSub {
  type: 'ward';
}

export class SubCounty extends WardConSub {
  type: 'subcounty';
}

export class Constituency extends WardConSub {
  type: 'constituency';
}
