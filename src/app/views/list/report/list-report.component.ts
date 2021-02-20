import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Report {
  title: string;
  date: string;
  concering: string[];
  submitted: string;
  ward: string;
  response: string;
  state: string;
}

@Component({
  selector: 'app-list-report',
  styleUrls: ['./list-report.component.scss'],
  templateUrl: './list-report.component.html',
})
export class ListReportComponent implements OnInit {
  /**
   * Reports mock data
   */
  reports: Report[] = [
    {
      title: 'Food Drinks Live',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Drug',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Health Facility',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Live Matters',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
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
    this.state = this.route.snapshot.queryParams.state;
    //=====================================================================
  }
}
