import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';

import { MenuNotification } from 'src/app/components/MenuContainer/menu-container.component';
import { AccountService } from 'src/app/services/account.service';

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
export class IntroComponent implements OnInit {
  user: string;
  county = 'Meru'; // Dynamic county
  date = moment(); // Today

  introItems: IntroItem[] = [
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
      notifications: [],
    },
    {
      label: 'Papers',
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
      notifications: [],
    },
    {
      label: 'Notices of Motions',
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
      notifications: [],
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
      notifications: [],
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
      notifications: [],
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
      notifications: [],
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
      notifications: [],
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
      notifications: [],
    },
    {
      label: 'Votebook',
      actions: [
        {
          label: 'Generation Votebook',
          url: '/generate/votebook',
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
      notifications: [],
    },
    {
      label: 'System',
      actions: [
        {
          label: 'Accounts',
          url: '/list/personnel',
        },
        {
          label: 'Departments',
          url: '/list/department',
        },
        {
          label: 'Committees',
          url: '/list/committee',
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
      notifications: [],
    },
  ];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.accountService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user.username;
      });
  }

  onLogOut() {
    this.accountService.logout();
  }
}
