import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { McaEmployee } from '../shared/types/mca-employee';

@Injectable({
  providedIn: 'root',
})
export class McaEmployeeService {
  /**
   * MCA/Employee mock data
   */
  private _mcaEmployees = new BehaviorSubject<McaEmployee[]>([
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
  ]);

  get mcaEmployees() {
    return this._mcaEmployees;
  }

  getMcaEmployees(): Observable<McaEmployee[]> {
    return this._mcaEmployees;
  }

  getMcaEmployee(id: string): Observable<McaEmployee> {
    return this._mcaEmployees.pipe(
      map((employees) => employees.find((employee) => employee._id === id))
    );
  }
}
