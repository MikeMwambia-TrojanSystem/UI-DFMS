import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash-es';
import { take } from 'rxjs/operators';

import { MotionService } from 'src/app/services/motion.service';
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

  constructor(
    private route: ActivatedRoute,
    private motionService: MotionService
  ) {}

  ngOnInit(): void {
    this.selectable = this.route.snapshot.queryParams.select || false;

    /**
     * These lines are just for dynamic state example and should be deleted when implementing a fetch request to backend.
     */
    this.state = this.route.snapshot.queryParams.state;
    //=====================================================================

    // Get Motions data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ motions }: { motions: Motion[] }) => {
        this.motions = _.orderBy(motions, 'createdAt', 'desc');
      });
  }

  onDelete(id: string) {
    this.motionService.deleteMotion(id).subscribe(() => {
      window.location.reload(); // Reload page when successfully deleting motion
    });
  }
}
