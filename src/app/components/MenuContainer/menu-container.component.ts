import { Component, Input } from '@angular/core';
import * as moment from 'moment';

export interface MenuNotification {
  label: string;
  date: string | moment.Moment | Date;
  url?: string;
}

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss'],
})
export class MenuContainerComponent {
  @Input() title: string;
  @Input() notifications: MenuNotification[];
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
