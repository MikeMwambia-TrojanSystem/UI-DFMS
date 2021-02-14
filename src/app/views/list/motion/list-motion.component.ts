import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Motion } from 'src/app/shared/types/motion';

@Component({
  selector: 'app-list-motion',
  styleUrls: ['./list-motion.component.scss'],
  templateUrl: './list-motion.component.html',
})
export class ListMotionComponent implements OnInit {
  /**
   * Predefined motions data
   */
  motions: Motion[];

  selectable: boolean;
  state: string; // This props is just for example and should be deleted when implementing a fetch request to backend.

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.selectable = this.route.snapshot.queryParams.select || false;

    /**
     * These lines are just for dynamic state example and should be deleted when implementing a fetch request to backend.
     */
    const state = this.route.snapshot.queryParams.state;

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

    // Fetch Motions from API
    this.apiService.getMotions().subscribe(({ message }) => {
      this.motions = message;
    });
  }
}
