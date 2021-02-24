import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

type PublishStatus = 'public' | 'private' | 'draft';

@Component({
  templateUrl: './publish-status.component.html',
  styleUrls: ['./publish-status.component.scss'],
})
export class PublishStatusComponent {
  private _cacheId: string;
  status: PublishStatus;

  constructor(
    private cacheServie: CacheService,
    private route: ActivatedRoute
  ) {
    //Get cache emit id from query url
    this._cacheId = this.route.snapshot.queryParams.id;
  }

  onPublish() {
    if (this._cacheId) {
      this.cacheServie.emit<PublishStatus>(
        this._cacheId,
        this.status as PublishStatus
      );
    }
  }
}
