import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Committee {
  name: string;
  date: string;
  profilePic: string;
}

@Component({
  selector: 'app-list-committee',
  templateUrl: './list-committee.component.html',
  styleUrls: ['./list-committee.component.scss'],
})
export class ListCommitteeComponent implements OnInit {
  /**
   * Committees mock data
   */
  committees: Committee[] = [
    {
      name: 'Committee on Food',
      date: '2019-08-26',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Committee on Lands',
      date: '2019-08-29',
      profilePic:
        'https://snappygoat.com/b/d1bed93330681e35898ef1c2778b46e7534e3c2c',
    },
    {
      name: 'Committee on Works',
      date: '2019-08-20',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
    },
    {
      name: 'Committee on Social Stuffs',
      date: '2019-08-25',
      profilePic:
        'https://snappygoat.com/b/b1994f0ceeba40094713fbdd2cb7aa717533fc65',
    },
  ];
  selectabe = false; // Whether the list is selectable

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectabe = this.route.snapshot.queryParams.select || false;
  }
}
