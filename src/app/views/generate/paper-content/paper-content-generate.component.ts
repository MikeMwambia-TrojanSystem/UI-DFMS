import { Component } from '@angular/core';
import * as moment from 'moment';

import { MenuNotification } from 'src/app/components/MenuContainer/menu-container.component';

interface Url {
  url: string;
  query?: Record<string, string>;
}

interface Item {
  label: string;
  select?: Url;
  generate?: Url;
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
      select: {
        url: '/management/oath',
        query: {
          state: 'public',
        },
      },
      generate: {
        url: '/management/oath',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Communication from Chair',
      select: {
        url: '/list/communication',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/edit/content/1',
        query: {
          return: '/list/communication',
          state: 'public',
        },
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Messages',
      select: {
        url: '/list/message',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/edit/content/1',
        query: {
          return: '/list/message',
          state: 'public',
        },
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Petitions',
      select: {
        url: '/list/petition',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/generate/petition',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Papers',
      select: {
        url: '/list/report',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/report-methods',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Notice of Motions',
      select: {
        url: '/list/motion',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/generate/motion',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Statements',
      select: {
        url: '/list/statement',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/upload/statement',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Motions',
      select: {
        url: '/list/motion',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/generate/motion',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Bills',
      select: {
        url: '/list/bill',
        query: {
          state: 'public',
          select: 'true',
        },
      },
      generate: {
        url: '/generate/bill',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
    {
      label: 'Adjournment',
      generate: {
        url: '/edit/content/1',
      },
      notifications: [
        { label: 'New Notification', date: moment().subtract(3, 'hours') },
      ],
    },
  ];
}
