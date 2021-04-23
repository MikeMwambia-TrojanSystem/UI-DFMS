import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import _ from 'lodash';

import { CacheService } from 'src/app/services/cache.service';
import { PetitionService } from 'src/app/services/petition.service';
import { Petition } from 'src/app/shared/types/petition';

@Component({
  selector: 'app-list-petition',
  templateUrl: './list-petition.component.html',
  styleUrls: ['./list-petition.component.scss'],
})
export class ListPetitionComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  private _petitions: Petition[];
  selectable: boolean;
  petitions: Petition[];

  constructor(
    private route: ActivatedRoute,
    private petitionService: PetitionService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Petitions data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ petitions }: { petitions: any[] }) => {
        const ordered = _.orderBy(petitions, 'createdAt', 'desc');
        this._petitions = ordered;
        this.petitions = ordered;
      });
  }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_PETITION',
      null,
      this.router.createUrlTree(['/list/petition'], {
        queryParams: {
          select: this.selectable,
          id: this._cacheId,
          state: this._state,
        },
      }),
      () => {
        return null;
      }
    );

    this.router.navigate(['/generate/petition'], {
      queryParams: {
        id: 'LIST_NEW_PETITION',
      },
    });
  }

  onDelete(id: string) {
    this.petitionService.deletePetition(id).subscribe(() => {
      window.location.reload();
    });
  }

  onSelect({ _id, content }: Petition) {
    this.cacheService.emit(this._cacheId, { _id, content });
  }

  onApprove({
    approvingAccount,
    concernedCommitee,
    dateCommitteResponse,
    datePresented,
    dateToBDiscussed,
    sponsoredBy,
    uploadingAccount,
    petitioners,
    _id,
    ...others
  }: Petition) {
    this.petitionService
      .updatePetition({
        ...others,
        sponsorName: sponsoredBy.sponsorName,
        sponsorId: sponsoredBy.sponsorId,
        concernedCommitee: concernedCommitee.name,
        concernedCommiteeId: concernedCommitee.id,
        petitioners: petitioners[0],
        published: true,
        id: _id,
      } as any)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onSearch(query: string) {
    this.petitions = this._petitions.filter((i) =>
      _.lowerCase(i.title).includes(_.lowerCase(query))
    );
  }
}
