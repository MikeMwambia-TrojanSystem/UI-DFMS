import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent {
  file: File;

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
}
