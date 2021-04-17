import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { VotebookService } from 'src/app/services/votebook.service';
import { OrderPaper } from '../../types/order-paper';

@Injectable({
  providedIn: 'root',
})
export class VotebookOrderPaperResolver implements Resolve<OrderPaper> {
  constructor(
    private orderPaperService: OrderPaperService,
    private votebookService: VotebookService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): OrderPaper | Promise<OrderPaper> | Observable<OrderPaper> {
    const votebookId = route.params.votebookId;

    return this.votebookService.getVotebook(votebookId).pipe(
      take(1),
      switchMap((votebook) =>
        this.orderPaperService.getOrderPaperByNo(votebook.orderPapersNo)
      )
    );
  }
}
