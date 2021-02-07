import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Statement {
  title: string;
  date: string;
  soughts: string[];
  requested: string;
  ward: string;
  state: string;
}

@Component({
  templateUrl: './list-statement.component.html',
  styleUrls: ['./list-statement.component.scss'],
})
export class ListStatementComponent implements OnInit {
  /**
   * Statements mock data
   */
  statements: Statement[] = [
    {
      title: 'Food Drinks Live',
      date: '9/3/2008',
      soughts: ['Employment', 'Youth', 'Fomo'],
      requested: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Drug',
      date: '9/3/2008',
      soughts: ['Employment', 'Youth', 'Fomo'],
      requested: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Health Facility',
      date: '9/3/2008',
      soughts: ['Employment', 'Youth', 'Fomo'],
      requested: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Live Matters',
      date: '9/3/2008',
      soughts: ['Employment', 'Youth', 'Fomo'],
      requested: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
  ];

  selectabe: boolean;
  state: string; // This props is just for example and should be deleted when implementing a fetch request to backend.

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectabe = this.route.snapshot.queryParams.select || false;

    /**
     * These lines are just for dynamic state example and should be deleted when implementing a fetch request to backend.
     */
    const state = this.route.snapshot.queryParams.state;

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
