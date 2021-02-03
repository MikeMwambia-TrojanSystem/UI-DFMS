import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Act {
  title: string;
  date: string;
  subjects: string[];
  sponsored: string;
  ward: string;
}

@Component({
  selector: 'app-list-act',
  templateUrl: './list-act.component.html',
  styleUrls: ['./list-act.component.scss'],
})
export class ListActComponent implements OnInit {
  /**
   * Acts mock data
   */
  acts: Act[] = [
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
  selectabe: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectabe = this.route.snapshot.queryParams.select || false;
  }
}
