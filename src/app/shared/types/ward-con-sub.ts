export class WardConSub {
  _id: string;
  name: string;
  county: string;
  subCounty: string;
  constituency: string;
  assemblyId: string;
  type: 'subcounty' | 'constituency' | 'ward';
  date: string;
  createdAt: string;
  updatedAt: string;
}

export class WardConSubPost {
  name: string;
  type: 'subcounty' | 'constituency' | 'ward';
  date: string;
  assemblyId: string;
  subCounty?: string;
  constituency?: string;
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
