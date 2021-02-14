export class WardConSubPost {
  name: string;
  type: 'subcounty' | 'constituency' | 'ward';
  date: string;
  assemblyId: string;
  subCounty?: string;
  constituency?: string;
}
