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
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Communication from the Chair',
      actions: [
        {
          label: 'Generation Communication',
          url: '/edit/content/1',
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
          url: 'http://localhost:4200/',
        },
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Messages',
      actions: [
        {
          label: 'Generation Messages',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Messages in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Messages',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Messages',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
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
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Petition',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Petition',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
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
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Reports',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Reports',
          url: 'http://localhost:4200/',
        },
        {
          label: 'Manage Reports',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Notice of Motion',
      actions: [
        {
          label: 'Generation Notice of Motion',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Notice of Motion in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Notice of Motion',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Notice of Motion',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Statements',
      actions: [
        {
          label: 'Generation Statements',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Statements in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Statements',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Statements',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Motion',
      actions: [
        {
          label: 'Generation Motion',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Motion in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Motion',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Motion',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Bills',
      actions: [
        {
          label: 'Generation Bills',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Bills in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Bills',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Bills',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Acts',
      actions: [
        {
          label: 'Generation Acts',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Acts in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Acts',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Acts',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Tentative Businesses (Notice Paper)',
      actions: [
        {
          label: 'Generation Tentative Businesses',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Tentative Businesses in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Tentative Businesses',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Tentative Businesses',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'Order Papers',
      actions: [
        {
          label: 'Generation Order Papers',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Order Papers in draft status',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Privately Published Order Papers',
          url: 'http://localhost:4200/',
        },
        {
          label: 'View Published Order Papers',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
    {
      label: 'System',
      actions: [
        {
          label: 'Accounts',
          url: 'http://localhost:4200/',
        },
        {
          label: 'Wards',
          url: 'http://localhost:4200/',
        },
        {
          label: 'Constituencies',
          url: 'http://localhost:4200/',
        },
        {
          label: 'Departments',
          url: 'http://localhost:4200/',
        },
      ],
      notifications: [
        {
          label: 'The report on land reforms was published',
          date: moment().subtract(3, 'hours'),
          url: 'http://localhost:4200/',
        },
      ],
    },
  ];
}
