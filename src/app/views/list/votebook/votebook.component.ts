import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { VotebookService } from 'src/app/services/votebook.service';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { Votebook } from 'src/app/shared/types/votebook';

@Component({
  selector: 'app-list-votebook',
  templateUrl: './votebook.component.html',
  styleUrls: ['./votebook.component.scss'],
})
export class ListVoteBookComponent implements OnInit {
  private _cacheId: string;
  private _orderPapers: OrderPaper[];

  votebooks: Votebook[];

  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private votebookService: VotebookService,
    private router: Router,
    private orderPaperService: OrderPaperService
  ) {}

  ngOnInit(): void {
    // Get query data
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select || false;
    this._cacheId = queryParams.id;

    // Get resolved data
    this.route.data
      .pipe(take(1))
      .subscribe(({ votebooks }: { votebooks: Votebook[] }) => {
        this.votebooks = votebooks;
      });

    this.orderPaperService
      .getOrderPapers()
      .pipe(take(1))
      .subscribe((orderPapers) => {
        this._orderPapers = orderPapers;
      });
  }

  getEditUrl(votebook: Votebook) {
    try {
      const orderPaperId = this._orderPapers.find(
        (o) => o.orderPaperNo === votebook.orderPapersNo
      )._id;

      return `/generate/votebook/${orderPaperId}/${votebook._id}`;
    } catch (err) {
      return undefined;
    }
  }

  onSelect(votebook: Votebook) {
    this.cacheService.emit(this._cacheId, votebook);
  }

  onDelete(id: string) {
    this.votebookService.deleteVotebook(id).subscribe(() => {
      window.location.reload();
    });
  }

  onCreateNew() {
    this.router.navigate(['/list/order-paper'], {
      queryParams: { select: true, purpose: 'NEW_VOTEBOOK' },
    });
  }
}
