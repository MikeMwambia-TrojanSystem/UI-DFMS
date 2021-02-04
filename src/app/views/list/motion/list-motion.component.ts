import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Motion {
  title: string;
  date: string;
  subjects: string[];
  sponsored: string;
  ward: string;
  state: string;
}

@Component({
  selector: 'app-list-motion',
  styleUrls: ['./list-motion.component.scss'],
  templateUrl: './list-motion.component.html',
})
export class ListMotionComponent implements OnInit {
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
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Drug',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Health Facility',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Live Matters',
      date: '9/3/2008',
      subjects: ['Employment', 'Youth', 'Fomo'],
      sponsored: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
  ];

  selectable: boolean;
  state: string; // This props is just for example and should be deleted when implementing a fetch request to backend.

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectable = this.route.snapshot.queryParams.select || false;

    /**
     * These lines are just for dynamic state example and should be deleted when implementing a fetch request to backend.
     */
    const state = this.route.snapshot.queryParams.state || 'draft';

    if (state === 'draft') {
      this.state = 'Draft';
    }
    if (state === 'public') {
      this.state = 'Publicly Published';
    }
    if (state === 'private') {
      this.state = 'Privately Published';
    }
    //=====================================================================
  }
}
