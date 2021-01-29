import { Component } from '@angular/core';

interface Item {
  label: string;
  generate: string;
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
      generate: '/',
    },
    {
      label: 'Communication from Chair',
      generate: '/',
    },
    {
      label: 'Messages',
      generate: '/',
    },
    {
      label: 'Petitions',
      generate: '/',
    },
    {
      label: 'Papers',
      generate: '/',
    },
    {
      label: 'Notice of Motions',
      generate: '/',
    },
    {
      label: 'Statements',
      generate: '/',
    },
    {
      label: 'Motions',
      generate: '/',
    },
    {
      label: 'Bills',
      generate: '/',
    },
    {
      label: 'Adjournment',
      generate: '/',
    },
  ];

  orderNo = 42; // Dynamic order no
}
