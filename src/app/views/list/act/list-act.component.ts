import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Act {
  title: string;
  date: string;
  subjects: string[];
  state: string;
}

@Component({
  selector: 'app-list-act',
  templateUrl: './list-act.component.html',
  styleUrls: ['./list-act.component.scss'],
})
export class ListActComponent implements OnInit {
  /**
   * Acts mock data
   */
  acts: Act[] = [
    {
      title: 'Development of Tanks',
      date: '9/3/2008',
      subjects: ['Lands', 'Housing', 'Agriculture', 'GMOs'],
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Development of Tanks',
      date: '9/3/2008',
      subjects: ['Lands', 'Housing', 'Agriculture', 'GMOs'],
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Development of Tanks',
      date: '9/3/2008',
      subjects: ['Lands', 'Housing', 'Agriculture', 'GMOs'],
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Development of Tanks',
      date: '9/3/2008',
      subjects: ['Lands', 'Housing', 'Agriculture', 'GMOs'],
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
    this.state = this.route.snapshot.queryParams.state;
    //=====================================================================
  }
}
