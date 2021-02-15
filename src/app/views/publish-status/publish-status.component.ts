import { Component } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';

type PublishStatus = 'public' | 'private' | 'draft';

@Component({
  templateUrl: './publish-status.component.html',
  styleUrls: ['./publish-status.component.scss'],
})
export class PublishStatusComponent {
  status: PublishStatus;

  constructor(private cacheServie: CacheService) {}

  onPublish() {
    this.cacheServie.emit<boolean>(status !== 'draft');
  }
}
