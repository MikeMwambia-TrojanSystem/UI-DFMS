import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

interface McaEmployee {
  _id: string;
  name: string;
  ward: string;
  profilePic: string;
  subcounty: string;
}

@Component({
  selector: 'app-list-mca-employee',
  templateUrl: './list-mca-employee.component.html',
  styleUrls: ['./list-mca-employee.component.scss'],
})
export class ListMcaEmployeeComponent implements OnInit {
  /**
   * MCA/Employee mock data
   */
  mcaEmployees: McaEmployee[] = [
    {
      _id: '2c283c71a028f8235d01',
      name: 'Kabutha Evelyn',
      ward: 'Nathu Ward',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
      subcounty: 'Main Gate Subcounty',
    },
    {
      _id: '2c283c71a028f8235d02',
      name: 'Paul Ansa',
      ward: 'Nathu Ward',
      profilePic:
        'https://snappygoat.com/b/d1bed93330681e35898ef1c2778b46e7534e3c2c',
      subcounty: 'Township Subcounty',
    },
    {
      _id: '2c283c71a028f8235d03',
      name: 'Abelina King',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
      subcounty: 'Township Subcounty',
    },
    {
      _id: '2c283c71a028f8235d04',
      name: 'Sampson Faith',
      ward: 'Nathu Ward',
      profilePic:
        'https://snappygoat.com/b/b1994f0ceeba40094713fbdd2cb7aa717533fc65',
      subcounty: 'Township Subcounty',
    },
  ];
  selectabe = false; // Whether the list is selectable

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.selectabe = this.route.snapshot.queryParams.select || false;
  }

  onSelect(employee: McaEmployee): void {
    if (this.cacheService.event) {
      this.cacheService.event.emit({ _id: employee._id, name: employee.name });
    }
  }
}
