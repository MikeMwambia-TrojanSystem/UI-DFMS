import { Component } from '@angular/core';
import { Moment } from 'moment';

interface OrderPaper {
  title: string;
  pages: string[];
  editedBy: string;
  from: string;
  publish: Date | Moment;
}

@Component({
  selector: 'app-view-order-paper',
  templateUrl: './order-paper-view.component.html',
  styleUrls: ['./order-paper-view.component.scss'],
})
export class OrderPaperViewComponent {
  /**
   * Predefined data
   */
  orderPaper: OrderPaper = {
    title: 'Development of Kura',
    pages: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Nisl condimentum id venenatis a condimentum. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Eu turpis egestas pretium aenean pharetra magna ac placerat. Est velit egestas dui id ornare arcu odio ut sem.',
      'Vitae nunc sed velit dignissim sodales. Libero enim sed faucibus turpis in eu. Massa enim nec dui nunc mattis enim ut. Magna etiam tempor orci eu lobortis elementum nibh. Porttitor leo a diam sollicitudin tempor id. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Nisl condimentum id venenatis a condimentum vitae. Scelerisque fermentum dui faucibus in ornare. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus.',
      'Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Volutpat est velit egestas dui id. Nec nam aliquam sem et. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Dolor sit amet consectetur adipiscing elit duis. Faucibus pulvinar elementum integer enim neque. Cras semper auctor neque vitae. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.',
      'Lectus nulla at volutpat diam ut venenatis tellus. Purus faucibus ornare suspendisse sed nisi. Metus aliquam eleifend mi in. Morbi tincidunt ornare massa eget egestas. Tellus mauris a diam maecenas sed. Ante in nibh mauris cursus. Pellentesque habitant morbi tristique senectus. Enim facilisis gravida neque convallis a cras semper. Id cursus metus aliquam eleifend mi in. ',
    ],
    editedBy: 'Alex',
    from: 'Alias Committee',
    publish: new Date('3/14/20'),
  };
  currentPage = 0;
  gotoPage: number;

  toPage(page: number): void {
    if (!isNaN(page) && page >= 0 && page < this.orderPaper.pages.length) {
      this.currentPage = page;
    }
  }

  onGotoChange(event: KeyboardEvent) {
    const value = parseInt((event.target as HTMLInputElement).value);
    if (!isNaN(value)) {
      this.gotoPage = value;
    }
  }
}
