import { Component } from '@angular/core';

interface Ward {
  name: string;
  profilePic: string;
}

@Component({
  selector: 'app-list-wards',
  templateUrl: './list-wards.component.html',
  styleUrls: ['./list-wards.component.scss'],
})
export class ListWardsComponent {
  wards: Ward[] = [
    {
      name: 'Peach Lovil',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Paul Ansa',
      profilePic:
        'https://snappygoat.com/b/d1bed93330681e35898ef1c2778b46e7534e3c2c',
    },
    {
      name: 'Abelina King',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
    },
    {
      name: 'Sampson Faith',
      profilePic:
        'https://snappygoat.com/b/b1994f0ceeba40094713fbdd2cb7aa717533fc65',
    },
  ];
}
