import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Communication {
  title: string;
  date: string;
  subjects: string[];
  sponsored: string;
  ward: string;
}

@Component({
  selector: 'app-list-communication',
  templateUrl: './list-communication.component.html',
  styleUrls: ['./list-communication.component.scss'],
})
export class ListCommunicationComponent implements OnInit {
  /**
   * Communication mock data
   */
  communications: Communication[] = [
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
