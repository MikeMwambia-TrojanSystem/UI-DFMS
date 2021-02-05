import { Component } from '@angular/core';
import * as moment from 'moment';

import { MenuNotification } from 'src/app/components/MenuContainer/menu-container.component';

interface Item {
  label: string;
  select?: string;
  generate?: string;
  skip?: string;
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
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Communication from Chair',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Messages',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Petitions',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Papers',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Notice of Motions',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Statements',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Motions',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Bills',
      select: '/',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Adjournment',
      generate: '/',
      skip: '/',
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
  ];
}
