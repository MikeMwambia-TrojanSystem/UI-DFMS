import { Component, Input } from '@angular/core';
import * as moment from 'moment';

export interface IntroAction {
  label: string;
  url?: string;
}

export interface IntroNotification {
  label: string;
  date: string | moment.Moment | Date;
  url?: string;
}

@Component({
  selector: 'app-intro-item',
  templateUrl: './intro-item.component.html',
  styleUrls: ['./intro-item.component.scss'],
})
export class IntroItemComponent {
  @Input() title: string;
  @Input() actions: IntroAction[];
  @Input() notifications: IntroNotification[];
  expanded = false;

  getTimeDiff(date: string | moment.Moment | Date): string {
    const now = moment();
    let result: number = now.diff(date, 'seconds');
    if (result < 60) {
      return `${result}sec${result === 1 ? '' : 's'} ago`;
    }
    result = now.diff(date, 'minutes');
    if (result < 60) {
      return `${result}minute${result === 1 ? '' : 's'} ago`;
    }
    result = now.diff(date, 'hours');
    if (result < 24) {
      return `${result}hour${result === 1 ? '' : 's'} ago`;
    }
    result = now.diff(date, 'days');
    return `${result}day${result === 1 ? '' : 's'} ago`;
  }

  onExpand(): void {
    this.expanded = !this.expanded;
  }
}
