import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss'],
})
export class ReportItemComponent {
  @Output() select = new EventEmitter<void>();
  @Input() title: string;
  @Input() date: string;
  @Input() concerning: string[] = [];
  @Input() submitted: string;
  @Input() ward: string;
  @Input() response: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() state: string;

  onSelect() {
    this.select.emit();
  }
}
