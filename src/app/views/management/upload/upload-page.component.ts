import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

import { CacheService } from 'src/app/services/cache.service';
import { Upload, UploadPost } from 'src/app/shared/types/upload';

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
  uploading = false;

  constructor(
    private cacheService: CacheService,
    private route: ActivatedRoute,
    private apiService: ApiService
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
        this.category = 'Bill';
        break;
      case 'act':
        this.category = 'Act';
        break;
      case 'personnel':
        this.category = 'Personnel';
        this.accept = 'image/*';
        break;
      case 'report':
        this.category = 'Report';
        this.accept = 'image/*,application/pdf';
        break;
      case 'annexus':
        this.category = 'Annexus';
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
    if (this._cacheId) {
      this.uploading = true;

      const formData = new FormData();

      formData.append('documents', this.category);
      formData.append('County', '123456');
      formData.append('signature', String(moment().unix()));
      formData.append('myFile', this.file);

      this.apiService.upload(formData).subscribe((result) => {
        this.uploading = false;

        if (result.location) {
          this.cacheService.emit<{ result: Upload; file: File }>(
            this._cacheId,
            {
              result,
              file: this.file,
            }
          );
        } else {
          alert('ERROR');
        }
      });
    }
  }
}
