import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Subcounty {
  name: string;
  date: string;
  profilePic: string;
}

@Component({
  templateUrl: './list-subcounty.component.html',
  styleUrls: ['./list-subcounty.component.scss'],
})
export class ListSubcountyComponent implements OnInit {
  subcounties: Subcounty[] = [
    {
      name: 'Peach Lovil',
      date: '08/26/2019',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Paul Ansa',
      date: '08/26/2019',
      profilePic:
        'https://snappygoat.com/b/d1bed93330681e35898ef1c2778b46e7534e3c2c',
    },
    {
      name: 'Abelina King',
      date: '08/26/2019',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
    },
    {
      name: 'Sampson Faith',
      date: '08/26/2019',
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
