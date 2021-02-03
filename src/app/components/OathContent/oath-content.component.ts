import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-oath-content',
  templateUrl: './oath-content.component.html',
  styleUrls: ['./oath-content.component.scss'],
})
export class OathContentComponent {
  @Input() content: string[];
  currentPage = 1;

  onChangePage(newPage: number) {
    if (newPage > 0 && newPage <= this.content.length) {
      this.currentPage = newPage;
    }
  }
}
