import { Component } from '@angular/core';
import * as moment from 'moment';

import { MenuNotification } from 'src/app/components/MenuContainer/menu-container.component';

export interface Action {
  label: string;
  url?: string;
  query?: Record<string, string>;
}

interface IntroItem {
  label: string;
  actions: Action[];
  notifications: MenuNotification[];
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  user: string = 'Florence'; // Dynamic username
  county = 'Meru'; // Dynamic county
  date = moment(); // Today

  /**
   * Predefined intro items
   */
  introItems: IntroItem[] = [
    {
      label: 'Administration of Oath',
      actions: [
        {
          label: 'Generation Oath',
          url: '/management/oath',
        },
        {
          label: 'View Oath in Draft Status',
          url: '/management/oath',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Oath',
          url: '/management/oath',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Oath',
          url: '/management/oath',
          query: {
            state: 'public',
          },
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Communication from the Chair',
      actions: [
        {
          label: 'Generation Communication',
          url: '/edit/content/1',
          query: { return: '/list/communication' },
        },
        {
          label: 'View Communication in draft status',
          url: '/list/communication',
          query: { state: 'draft' },
        },
        {
          label: 'View Privately Published Communication',
          url: '/list/communication',
          query: { state: 'private' },
        },
        {
          label: 'View Published Communications',
          url: '/list/communication',
          query: { state: 'public' },
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Messages',
      actions: [
        {
          label: 'Generation Messages',
          url: '/edit/content/1',
          query: {
            return: '/list/message',
          },
        },
        {
          label: 'View Messages in draft status',
          url: '/list/message',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Messages',
          url: '/list/message',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Messages',
          url: '/list/message',
          query: {
            state: 'public',
          },
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Petition',
      actions: [
        {
          label: 'Generation Petition',
          url: '/generate/petition',
        },
        {
          label: 'View Petition in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Petition',
          url: '/',
        },
        {
          label: 'View Published Petition',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Reports',
      actions: [
        {
          label: 'Generation Reports',
          url: '/report-methods',
        },
        {
          label: 'View Reports in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Reports',
          url: '/',
        },
        {
          label: 'View Published Reports',
          url: '/',
        },
        {
          label: 'Manage Reports',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Notice of Motion',
      actions: [
        {
          label: 'Generation Notice of Motion',
          url: '/',
        },
        {
          label: 'View Notice of Motion in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Notice of Motion',
          url: '/',
        },
        {
          label: 'View Published Notice of Motion',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Statements',
      actions: [
        {
          label: 'Generation Statements',
          url: '/',
        },
        {
          label: 'View Statements in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Statements',
          url: '/',
        },
        {
          label: 'View Published Statements',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Motion',
      actions: [
        {
          label: 'Generation Motion',
          url: '/',
        },
        {
          label: 'View Motion in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Motion',
          url: '/',
        },
        {
          label: 'View Published Motion',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Bills',
      actions: [
        {
          label: 'Generation Bills',
          url: '/',
        },
        {
          label: 'View Bills in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Bills',
          url: '/',
        },
        {
          label: 'View Published Bills',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Acts',
      actions: [
        {
          label: 'Generation Acts',
          url: '/',
        },
        {
          label: 'View Acts in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Acts',
          url: '/',
        },
        {
          label: 'View Published Acts',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Tentative Businesses (Notice Paper)',
      actions: [
        {
          label: 'Generation Tentative Businesses',
          url: '/',
        },
        {
          label: 'View Tentative Businesses in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Tentative Businesses',
          url: '/',
        },
        {
          label: 'View Published Tentative Businesses',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Order Papers',
      actions: [
        {
          label: 'Generation Order Papers',
          url: '/',
        },
        {
          label: 'View Order Papers in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Order Papers',
          url: '/',
        },
        {
          label: 'View Published Order Papers',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'Votebook',
      actions: [
        {
          label: 'Generation Votebook',
          url: '/',
        },
        {
          label: 'View Votebook in draft status',
          url: '/',
        },
        {
          label: 'View Privately Published Papers',
          url: '/',
        },
        {
          label: 'View Published Papers',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
    {
      label: 'System',
      actions: [
        {
          label: 'Accounts',
          url: '/',
        },
        {
          label: 'Wards',
          url: '/',
        },
        {
          label: 'Constituencies',
          url: '/',
        },
        {
          label: 'Departments',
          url: '/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: '/',
        },
      ],
    },
  ];
}
