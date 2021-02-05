import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface TentativeBusiness {
  title: string;
  date: string;
  state: string;
}

@Component({
  templateUrl: './list-tentative-business.component.html',
  styleUrls: ['./list-tentative-business.component.scss'],
})
export class ListTentativeBusinesssComponent implements OnInit {
  /**
   * Tentative Businesses mock data
   */
  tentativeBussinesses: TentativeBusiness[] = [
    {
      title: 'development of Food Banks',
      date: '9/3/2008',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'development of Food Banks',
      date: '9/3/2008',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'development of Food Banks',
      date: '9/3/2008',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'development of Food Banks',
      date: '9/3/2008',
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
    const state = this.route.snapshot.queryParams.state || 'draft';

    if (state === 'draft') {
      this.state = 'Draft';
    }
    if (state === 'public') {
      this.state = 'Publicly Published';
    }
    if (state === 'private') {
      this.state = 'Privately Published';
    }
    //=====================================================================
  }
}
