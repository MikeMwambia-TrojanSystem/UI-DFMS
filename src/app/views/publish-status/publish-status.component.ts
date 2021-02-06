import { Component } from '@angular/core';

type PublishStatus = 'public' | 'private' | 'draft';

@Component({
  templateUrl: './publish-status.component.html',
  styleUrls: ['./publish-status.component.scss'],
})
export class PublishStatusComponent {
  status: PublishStatus;
}
