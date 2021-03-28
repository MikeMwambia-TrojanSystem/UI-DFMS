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
          url: '/list/petition',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Petition',
          url: '/list/petition',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Petition',
          url: '/list/petition',
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
      label: 'Reports',
      actions: [
        {
          label: 'Generation Reports',
          url: '/report-methods',
        },
        {
          label: 'View Reports in draft status',
          url: '/list/report',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Reports',
          url: '/list/report',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Reports',
          url: '/list/report',
          query: {
            state: 'public',
          },
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
          url: '/generate/motion',
        },
        {
          label: 'View Notice of Motion in draft status',
          url: '/list/motion',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Notice of Motion',
          url: '/list/motion',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Notice of Motion',
          url: '/list/motion',
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
      label: 'Statements',
      actions: [
        {
          label: 'Generation Statements',
          url: '/upload/statement',
        },
        {
          label: 'View Statements in draft status',
          url: '/list/statement',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Statements',
          url: '/list/statement',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Statements',
          url: '/list/statement',
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
      label: 'Motion',
      actions: [
        {
          label: 'Generation Motion',
          url: '/generate/motion',
        },
        {
          label: 'View Motion in draft status',
          url: '/list/motion',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Motion',
          url: '/list/motion',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Motion',
          url: '/list/motion',
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
      label: 'Bills',
      actions: [
        {
          label: 'Generation Bills',
          url: '/generate/bill',
        },
        {
          label: 'View Bills in draft status',
          url: '/list/bill',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Bills',
          url: '/list/bill',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Bills',
          url: '/list/bill',
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
      label: 'Acts',
      actions: [
        {
          label: 'Generation Acts',
          url: '/generate/act',
        },
        {
          label: 'View Acts in draft status',
          url: '/list/act',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Acts',
          url: '/list/act',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Acts',
          url: '/list/act',
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
      label: 'Tentative Businesses (Notice Paper)',
      actions: [
        {
          label: 'Generation Tentative Businesses',
          url: '/edit/content/1',
          query: {
            return: '/list/tentative-business',
          },
        },
        {
          label: 'View Tentative Businesses in draft status',
          url: '/list/tentative-business',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Tentative Businesses',
          url: '/list/tentative-business',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Tentative Businesses',
          url: '/list/tentative-business',
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
      label: 'Order Papers',
      actions: [
        {
          label: 'Generation Order Papers',
          url: '/generate/order-paper',
        },
        {
          label: 'View Order Papers in draft status',
          url: '/list/order-paper',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Order Papers',
          url: '/list/order-paper',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Order Papers',
          url: '/list/order-paper',
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
      label: 'Votebook',
      actions: [
        {
          label: 'Generation Votebook',
          url: '/list/order-paper',
          query: {
            purpose: 'NEW_VOTEBOOK',
            select: 'true',
          },
        },
        {
          label: 'View Votebook in draft status',
          url: '/list/votebook',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Papers',
          url: '/list/votebook',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Published Papers',
          url: '/list/votebook',
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
      label: 'System',
      actions: [
        {
          label: 'Accounts',
          url: '/management/accounts',
        },
        {
          label: 'Departments',
          url: '/management/accounts',
        },
        {
          label: 'Committees',
          url: '/management/accounts',
        },
        {
          label: 'Wards',
          url: '/list/wards',
        },
        {
          label: 'Constituencies',
          url: '/list/constituency',
        },
        {
          label: 'Subcounties',
          url: '/list/subcounty',
        },
        {
          label: 'Create Committee',
          url: '/create/committee',
        },
        {
          label: 'Create Constituencies',
          url: '/create/constituencies',
        },
        {
          label: 'Create Department',
          url: '/create/department',
        },
        {
          label: 'Create SubCounty',
          url: '/create/subcounty',
        },
        {
          label: 'Create Wards',
          url: '/create/wards',
        },
        {
          label: 'Create Employee Profile',
          url: '/create/employee',
        },
        {
          label: 'Create MCA Profile',
          url: '/create/mca',
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
