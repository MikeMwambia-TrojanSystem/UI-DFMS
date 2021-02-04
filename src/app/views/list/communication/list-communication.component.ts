import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Communication {
  title: string;
  date: string;
  state: string;
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
      title: 'development of Food',
      date: '9/3/2008',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'development of Food',
      date: '9/3/2008',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'development of Food',
      date: '9/3/2008',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'development of Food',
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
