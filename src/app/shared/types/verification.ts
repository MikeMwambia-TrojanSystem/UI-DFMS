export interface PhoneVerification {
  code: string;
  request_id: string;
  userId?: string;
  mcaId?: string;
  db?: string;
}
