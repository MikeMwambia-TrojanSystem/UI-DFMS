import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';

import {
  MenuItem,
  MenuNotification,
} from 'src/app/components/MenuContainer/menu-container.component';
import { AccountService } from 'src/app/services/account.service';

export interface Action {
  label: string;
  url?: string;
  query?: Record<string, string>;
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

  introItems: MenuItem[] = [
    {
      label: 'Petition',
      actions: [
        {
          label: 'Generate Petition',
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
          label: 'View Publicly Published Petition',
          url: '/list/petition',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Papers',
      actions: [
        {
          label: 'Generate Reports',
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
          label: 'View Publicly Published Reports',
          url: '/list/report',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Notices of Motions',
      actions: [
        {
          label: 'Generate Notice of Motion',
          url: '/generate/notice-of-motion',
        },
        {
          label: 'View Notice of Motion in Draft status',
          url: '/list/notice-of-motion',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Notice of Motion',
          url: '/list/notice-of-motion',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Publicly Published Notice of Motion',
          url: '/list/notice-of-motion',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Statements',
      actions: [
        {
          label: 'Generate Statements',
          url: '/upload/statement',
        },
        {
          label: 'View Statements in Draft status',
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
          label: 'View Publicly Published Statements',
          url: '/list/statement',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Motion',
      actions: [
        {
          label: 'Generate Motion',
          url: '/generate/motion',
        },
        {
          label: 'View Motion in Draft status',
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
          label: 'View Publicly Published Motion',
          url: '/list/motion',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Bills',
      actions: [
        {
          label: 'Generate Bills',
          url: '/generate/bill',
        },
        {
          label: 'View Bills in Draft status',
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
          label: 'View Publicly Published Bills',
          url: '/list/bill',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Acts',
      actions: [
        {
          label: 'Generate Acts',
          url: '/generate/act',
        },
        {
          label: 'View Acts in Draft status',
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
          label: 'View Publicly Published Acts',
          url: '/list/act',
          query: {
            state: 'public',
          },
        },
      ],
    },

    {
      label: 'Order Papers',
      actions: [
        {
          label: 'Generate Order Papers',
          url: '/generate/order-paper',
        },
        {
          label: 'View Order Papers in Draft status',
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
          label: 'View Publicly Published Order Papers',
          url: '/list/order-paper',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Tentative Business',
      actions: [
        {
          label: 'Generate Tentative Businesses',
          url: '/generate/tentative-business',
        },
        {
          label: 'View Tentative Businesses in Draft status',
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
          label: 'View Publicly Published Tentative Businesses',
          url: '/list/tentative-business',
          query: {
            state: 'public',
          },
        },
      ],
    },
    {
      label: 'Votebook',
      actions: [
        {
          label: 'Generate Votebook',
          url: '/generate/votebook',
        },
        {
          label: 'View Votebooks in Draft status',
          url: '/list/votebook',
          query: {
            state: 'draft',
          },
        },
        {
          label: 'View Privately Published Votebooks',
          url: '/list/votebook',
          query: {
            state: 'private',
          },
        },
        {
          label: 'View Publicly Published Votebooks',
          url: '/list/votebook',
          query: {
            state: 'public',
          },
        },
      ],
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
          label: 'View Employee profile',
          url: '/list/personnel',
        },
        {
          label: 'Create MCA Profile',
          url: '/create/mca',
        },
        {
          label: 'View MCA profile',
          url: '/list/mca-employee',
        },
      ],
    },
  ];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.accountService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user.username;

        const group = user.group;

        if (group === 'mca') {
          this.introItems = [
            {
              label: 'Petition',
              actions: [
                {
                  label: 'View Publicly Published Petition',
                  url: '/list/petition',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Papers',
              actions: [
                {
                  label: 'View Publicly Published Reports',
                  url: '/list/report',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Notices of Motions',
              actions: [
                {
                  label: 'View Publicly Published Notice of Motion',
                  url: '/list/notice-of-motion',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Statements',
              actions: [
                {
                  label: 'View Publicly Published Statements',
                  url: '/list/statement',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Motion',
              actions: [
                {
                  label: 'View Publicly Published Motion',
                  url: '/list/motion',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Bills',
              actions: [
                {
                  label: 'View Publicly Published Bills',
                  url: '/list/bill',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Acts',
              actions: [
                {
                  label: 'View Publicly Published Acts',
                  url: '/list/act',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },

            {
              label: 'Order Papers',
              actions: [
                {
                  label: 'View Publicly Published Order Papers',
                  url: '/list/order-paper',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Tentative Business',
              actions: [
                {
                  label: 'View Publicly Published Tentative Businesses',
                  url: '/list/tentative-business',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
            {
              label: 'Votebook',
              actions: [
                {
                  label: 'View Publicly Published Votebooks',
                  url: '/list/votebook',
                  query: {
                    state: 'public',
                  },
                },
              ],
            },
          ];
        }
      });
  }

  onLogOut() {
    this.accountService.logout();
  }
}
