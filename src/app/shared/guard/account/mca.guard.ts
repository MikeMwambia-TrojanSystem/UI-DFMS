import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateNotMcaGroup implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isNotPublishedListPage =
      state.url.includes('/list/') &&
      !state.url.includes('?state=private') &&
      !state.url.includes('?state=draft');

    return this.accountService.group === 'mca'
      ? isNotPublishedListPage
        ? true
        : this.router.createUrlTree(['/', 'intro'])
      : true;
  }
}
