import { Component, Input } from '@angular/core';
import * as moment from 'moment';

export interface MenuNotification {
  key?: string;
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

  onExpand(): void {
    this.expanded = !this.expanded;
  }
}
