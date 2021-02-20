import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface OrderPaper {
  number: number;
  date: Date;
  views: number;
  state: string;
}

@Component({
  selector: 'app-list-order-paper',
  styleUrls: ['./list-order-paper.component.scss'],
  templateUrl: './list-order-paper.component.html',
})
export class ListOrderPaperComponent implements OnInit {
  /**
   * Petitions mock data
   */
  orderPapers: OrderPaper[] = [
    {
      number: 178,
      date: new Date(),
      views: 28,
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      number: 178,
      date: new Date(),
      views: 28,
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      number: 178,
      date: new Date(),
      views: 28,
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      number: 178,
      date: new Date(),
      views: 28,
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
