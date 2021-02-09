import { Component } from '@angular/core';

interface Url {
  url: string;
  query?: Record<string, string>;
}

interface Item {
  label: string;
  generate: Url;
}

@Component({
  selector: 'app-generate-votebook',
  templateUrl: './votebook-generate.component.html',
  styleUrls: ['./votebook-generate.component.scss'],
})
export class VotebookGenerateComponent {
  /**
   * Predefined data
   */
  items: Item[] = [
    {
      label: 'Administration of Oath',
      generate: {
        url: '/edit/content/1',
        query: {
          return: '/management/oath',
        },
      },
    },
    {
      label: 'Communication from Chair',
      generate: {
        url: '/edit/content/1',
        query: { return: '/list/communication' },
      },
    },
    {
      label: 'Messages',
      generate: {
        url: '/edit/content/1',
        query: {
          return: '/list/message',
        },
      },
    },
    {
      label: 'Petitions',
      generate: {
        url: '/edit/content/1',
        query: {
          return: '/list/petition',
        },
      },
    },
    {
      label: 'Papers',
      generate: {
        url: '/edit/paper/1',
      },
    },
    {
      label: 'Notice of Motions',
      generate: {
        url: '/edit/paper/1',
        query: {
          return: '/list/motion',
        },
      },
    },
    {
      label: 'Statements',
      generate: {
        url: '/edit/paper/1',
        query: {
          return: '/list/statement',
        },
      },
    },
    {
      label: 'Motions',
      generate: {
        url: '/edit/paper/1',
        query: {
          return: '/list/motion',
        },
      },
    },
    {
      label: 'Bills',
      generate: {
        url: '/edit/paper/1',
        query: {
          return: '/list/bill',
        },
      },
    },
    {
      label: 'Adjournment',
      generate: {
        url: '/edit/paper/1',
      },
    },
  ];

  orderNo = 42; // Dynamic order no
}
