import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { VotebookService } from 'src/app/services/votebook.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateVotebook implements CanActivate {
  constructor(
    private votebookService: VotebookService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    const votebookId = route.params.votebookId;

    return this.votebookService.getVotebook(votebookId).pipe(
      take(1),
      map((votebook) => (votebook ? true : this.router.createUrlTree(['/'])))
    );
  }
}
