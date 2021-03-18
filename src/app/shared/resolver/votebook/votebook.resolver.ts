import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VotebookService } from 'src/app/services/votebook.service';
import { Votebook } from '../../types/votebook';

@Injectable({
  providedIn: 'root',
})
export class VotebookResolver implements Resolve<Votebook> {
  constructor(private votebookService: VotebookService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Votebook | Promise<Votebook> | Observable<Votebook> {
    const votebookId = route.params.votebookId;

    return this.votebookService.getVotebook(votebookId).pipe(take(1));
  }
}
