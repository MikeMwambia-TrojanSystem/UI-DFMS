import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { VotebookService } from 'src/app/services/votebook.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateVotebook implements CanActivate {
  constructor(
    private votebookService: VotebookService,
    private orderPaperService: OrderPaperService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {
    const votebookId = route.params.votebookId;

    return this.votebookService.getVotebook(votebookId).pipe(
      take(1),
      switchMap((votebook) =>
        votebook
          ? this.orderPaperService.getOrderPaperByNo(votebook.orderPapersNo)
          : of(this.router.createUrlTree(['/']))
      ),
      map((orderPaper) =>
        orderPaper ? true : this.router.createUrlTree(['/'])
      )
    );
  }
}
