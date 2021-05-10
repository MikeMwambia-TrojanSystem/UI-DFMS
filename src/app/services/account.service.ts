import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppAccount } from '../shared/types/account';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _user = new BehaviorSubject<AppAccount>(undefined);

  constructor(private apiService: ApiService, private router: Router) {}

  get user() {
    return this._user.getValue();
  }

  get group() {
    return this._user.getValue().group;
  }

  getUser(): Observable<AppAccount> {
    return this._user.pipe(
      map((user) => {
        if (!user) {
          const saved = localStorage.getItem('user');

          if (saved) {
            const { username, group, _id } = JSON.parse(saved);

            this._user.next({ username, group, _id });
            return { username, group, _id };
          }
        }

        return user;
      })
    );
  }

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

  login(form: {
    username: string;
    password: string;
    group: 'speaker' | 'drafter' | 'clerk';
  }) {
    const { username, group } = form;

    return this.apiService.login(form).pipe(
      tap(({ token, id }) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem(
          'user',
          JSON.stringify({ username, group, _id: id })
        );

        this._user.next({
          username,
          group,
          _id: id,
        });
      })
    );
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

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    this._user.next(undefined);
    this.router.navigate(['/', 'login']);
  }
}
