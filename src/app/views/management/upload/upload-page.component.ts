import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

import { CacheService } from 'src/app/services/cache.service';
import { UploadPost } from 'src/app/shared/types/upload';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent implements OnInit {
  private _cacheId: string;
  file: File;
  category = 'Acts';
  accept = 'application/pdf';

  constructor(
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get cache id from url query
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    const category = queryParams.category;

    switch (category) {
      case 'statement':
        this.category = 'Statement';
        break;
      case 'mca':
        this.category = 'MCA Profile';
        this.accept = 'image/*';
        break;
      case 'petition':
        this.category = 'Petition';
        break;
      case 'bill':
        this.category = 'Petition';
        break;
      case 'act':
        this.category = 'Act';
        break;
      case 'personnel':
        this.category = 'Personnel';
        this.accept = 'image/*';
        break;
      default:
        break;
    }
  }

  onUpload(event) {
    this.file = event.target.files[0];
  }

  onDrop(event) {
    event.preventDefault();
    this.file = event.dataTransfer.files[0];
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onUploadFileBtn() {
    this.cacheService.emit<UploadPost>(this._cacheId, {
      documents: this.category,
      County: '123456',
      signature: moment().toISOString(),
      myFile: this.file,
    });
  }
}
