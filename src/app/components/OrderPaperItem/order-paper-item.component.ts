import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-paper-item',
  templateUrl: './order-paper-item.component.html',
  styleUrls: ['./order-paper-item.component.scss'],
})
export class OrderPaperItemComponent {
  @Input() number: number;
  @Input() date: string;
  @Input() views: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() state: string;
}
