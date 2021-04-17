import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash-es';
import { take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';

import { NoticeOfMotionService } from 'src/app/services/notice-of-motion.service';
import { Department } from 'src/app/shared/types/department';
import { Motion } from 'src/app/shared/types/motion';

@Component({
  styleUrls: ['./list-notice.component.scss'],
  templateUrl: './list-notice.component.html',
})
export class ListNoticeOfMotionComponent implements OnInit {
  private _cacheId: string;
  private _state: 'draft' | 'private' | 'public';
  noticeOfMotions: Motion[];
  selectable: boolean;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get selectable state, cache emit id, state from query url
    const queryParams = this.route.snapshot.queryParams;
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;
    this._state = queryParams.state;

    // Get Motions data from resolver
    this.route.data
      .pipe(take(1))
      .subscribe(({ notices }: { notices: Motion[] }) => {
        this.noticeOfMotions = _.orderBy(notices, 'createdAt', 'desc');
      });
  }

  // onDelete(id: string) {
  //   this.noticeOfMotionService.deleteMotion(id).subscribe(() => {
  //     window.location.reload(); // Reload page when successfully deleting motion
  //   });
  // }

  onCreateNew() {
    this.cacheService.cache(
      'LIST_NEW_MOTION',
      null,
      this.router.createUrlTree(['/list/motion'], {
        queryParams: {
          select: this.selectable,
          id: this._cacheId,
          state: this._state,
        },
      }),
      () => {
        return null;
      }
    );

    this.router.navigate(['/generate/motion'], {
      queryParams: {
        id: 'LIST_NEW_MOTION',
      },
    });
  }

  onSelect(motion: Motion) {
    this.cacheService.emit(this._cacheId, motion);
  }
}
