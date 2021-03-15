import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss'],
})
export class ReportItemComponent {
  @Output() select = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() title: string;
  @Input() date: string;
  @Input() concerning: string[] = [];
  @Input() submitted: string;
  @Input() ward: string;
  @Input() response: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() state: string;
  @Input() editUrl: string;
  @Input() downloadUrl: string;

  onSelect() {
    this.select.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
