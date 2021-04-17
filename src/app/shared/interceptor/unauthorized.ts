import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Injectable()
export class HttpResponseUnauthorizedIntercepter implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((e) => {
        if (e instanceof HttpResponse && e.status === 401) {
          this.accountService.logout();
        }

        return e;
      })
    );
  }
}
