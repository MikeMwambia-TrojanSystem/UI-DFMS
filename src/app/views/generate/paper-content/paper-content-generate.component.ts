import { Component } from '@angular/core';
import * as moment from 'moment';

import { MenuNotification } from 'src/app/components/MenuContainer/menu-container.component';

interface Item {
  label: string;
  select?: string;
  generate?: string;
  notifications?: MenuNotification[];
}

@Component({
  selector: 'app-generate-paper-content',
  templateUrl: './paper-content-generate.component.html',
  styleUrls: ['./paper-content-generate.component.scss'],
})
export class PaperContentGenerateComponent {
  /**
   * Predefined data
   */
  items: Item[] = [
    {
      label: 'Administration of Oath',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Communication from Chair',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Messages',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Petitions',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Papers',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Notice of Motions',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Statements',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Motions',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Bills',
      select: '/',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Adjournment',
      generate: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
  ];
}
