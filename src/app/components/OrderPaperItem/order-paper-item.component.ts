import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-paper-item',
  templateUrl: './order-paper-item.component.html',
  styleUrls: ['./order-paper-item.component.scss'],
})
export class OrderPaperItemComponent {
  @Output() select = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Input() number: number;
  @Input() date: string;
  @Input() views: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() state: string;
  @Input() editUrl: string;
  @Input() downloadUrl: string;

  onDelete() {
    this.delete.emit();
  }

  onDownload() {}

  onSelect() {
    this.select.emit();
  }
}
