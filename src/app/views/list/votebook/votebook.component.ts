import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
  private _votebooks: Votebook[];
  votebooks: Votebook[];

  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private votebookService: VotebookService,
    private orderPaperService: OrderPaperService,
    private router: Router
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
        const ordered = _.orderBy(votebooks, 'datePublished', 'desc');
        this._votebooks = ordered;
        this.votebooks = ordered;
      });
  }

  getEditUrl(votebook: Votebook) {
    try {
      return `/generate/votebook/${votebook._id}`;
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
    this.router.navigate(['/generate/votebook'], {
      queryParams: { select: false },
    });
  }

  onApprove({
    _id,
    presiding,
    orderPapersNo,
    adminstrationOfOath,
    bills,
    communicationFromChainr,
    messages,
    motions,
    noticeOfMotions,
    papers,
    petitions,
    statements,
    approvingAccount,
    ...others
  }: Votebook) {
    this.orderPaperService
      .getOrderPaperByNo(orderPapersNo)
      .pipe(
        switchMap((orderPaper) =>
          this.votebookService.updateVotebook({
            ...others,
            pageNoToDate: orderPaper.pageNoToDate,
            orderPaperId: orderPaper._id,
            orderPapersNo: orderPapersNo,
            presiding: presiding.name,
            presidingPosition: presiding.position,
            presidingId: presiding.id,
            approvingAccount: approvingAccount.account,
            approverId: approvingAccount.approverId,
            adminstrationOfOathReply: adminstrationOfOath.join('&&&'),
            communicationFromChainr: communicationFromChainr.join('&&&'),
            messageContent: messages.join('&&&'),
            petionReply: petitions.join('&&&'),
            reportReply: papers.join('&&&'),
            noticeOfMotionsReply: noticeOfMotions.join('&&&'),
            statementReply: statements.join('&&&'),
            motions: motions
              .filter((m) => m.content)
              .map(
                (m) =>
                  `content=${m.content}|||source=${m.source}|||motionId=${m.documentId}`
              )
              .join('&&&'),
            bills: bills
              .filter((m) => m.content)
              .map(
                (m) =>
                  `content=${m.content}|||source=${m.source}|||billId=${m.documentId}`
              )
              .join('&&&'),
            published: true,
            id: _id,
          } as any)
        )
      )
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.votebooks = this._votebooks.filter((i) =>
      i.votebookNo.toString().includes(_.lowerCase(query))
    );
  }
}
