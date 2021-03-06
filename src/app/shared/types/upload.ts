export interface UploadPost {
  documents: string;
  County: string;
  signature: string;
  myFile: File;
}

export interface Upload {
  etag: string;
  id: string;
  key: string;
  location: string;
  uploadedToS3: boolean;
}
