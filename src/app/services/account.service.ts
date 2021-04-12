import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private apiService: ApiService) {}

  createAccount(form: any): Observable<{ request_id: string; userId: string }> {
    return this.apiService.createAccount(form).pipe(
      map(({ message }) => {
        return {
          request_id: message.request_id,
          userId: message.userId,
        };
      })
    );
  }

  verifyOtp(form: any) {
    return this.apiService.verifyAccount(form);
  }

  login(form: { username: string; password: string; group: string }) {
    return this.apiService.login(form);
  }

  changePassword(form: { username: string; password: string }) {
    /*return of({
      request_id: 'test',
      userId: '12345',
    });*/
    return this.apiService.changePassword(form).pipe(
      map(({ success }) => ({
        request_id: success.request_id,
        userId: success.userId,
      }))
    );
  }

  updatePassword(form: any) {
    return this.apiService.updatePassword(form);
  }
}
