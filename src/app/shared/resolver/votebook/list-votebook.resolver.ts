import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { VotebookService } from 'src/app/services/votebook.service';
import { Votebook } from '../../types/votebook';

@Injectable({
  providedIn: 'root',
})
export class ListVotebookResolver implements Resolve<Votebook[]> {
  constructor(private votebookService: VotebookService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Votebook[] | Promise<Votebook[]> | Observable<Votebook[]> {
    const publishState = route.queryParams.state || 'public';

    return this.votebookService.getVotebooks().pipe(
      take(1),
      map((votebooks) =>
        votebooks.filter((v) => v.publishState === publishState)
      )
    );
  }
}
