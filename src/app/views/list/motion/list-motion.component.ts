import { Component } from '@angular/core';

interface Motion {
  title: string;
  date: string;
  subjects: string[];
  sponsored: string;
  ward: string;
}

@Component({
  selector: 'app-list-motion',
  styleUrls: ['./list-motion.component.scss'],
  templateUrl: './list-motion.component.html',
})
export class ListMotionComponent {
  /**
   * Predefined motions data
   */
  motions: Motion[] = [
    {
      title: 'Food Drinks Live',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
    },
    {
      title: 'Drug',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
    },
    {
      title: 'Health Facility',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
    },
    {
      title: 'Live Matters',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
    },
  ];
}
