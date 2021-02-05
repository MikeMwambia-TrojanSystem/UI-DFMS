import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Constituency {
  name: string;
  subcounty: string;
  profilePic: string;
}

@Component({
  templateUrl: './list-constituency.component.html',
  styleUrls: ['./list-constituency.component.scss'],
})
export class ListConstituencyComponent implements OnInit {
  /**
   * Constituencies mock data
   */
  constituencies: Constituency[] = [
    {
      name: 'Ikenme North',
      subcounty: 'Ntonyiri Subcounty',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Paul Ansa',
      subcounty: 'Ntonyiri Subcounty',
      profilePic:
        'https://snappygoat.com/b/d1bed93330681e35898ef1c2778b46e7534e3c2c',
    },
    {
      name: 'Abelina King',
      subcounty: 'Ntonyiri Subcounty',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
    },
    {
      name: 'Sampson Faith',
      subcounty: 'Ntonyiri Subcounty',
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
