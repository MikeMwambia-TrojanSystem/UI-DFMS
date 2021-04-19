import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Injectable()
export class HttpResponseUnauthorizedIntercepter implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e instanceof HttpErrorResponse && e.status === 401) {
          this.accountService.logout();
        }

        return throwError(e);
      })
    );
  }
}
