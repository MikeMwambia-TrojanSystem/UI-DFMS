import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Personnel {
  name: string;
  department: string;
  profilePic: string;
}

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss'],
})
export class ListPersonnelComponent implements OnInit {
  personnels: Personnel[] = [
    {
      name: 'Peach Lovil',
      department: 'Department of Food',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Paul Ansa',
      department: 'Department of Health',
      profilePic:
        'https://snappygoat.com/b/d1bed93330681e35898ef1c2778b46e7534e3c2c',
    },
    {
      name: 'Abelina King',
      department: 'Department of Finance',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
    },
    {
      name: 'Sampson Faith',
      department: 'Department of Braintreat',
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
