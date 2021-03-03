import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-statement-item',
  templateUrl: './statement-item.component.html',
  styleUrls: ['./statement-item.component.scss'],
})
export class StatementItemComponent {
  @Output() delete = new EventEmitter<void>();
  @Input() title: string;
  @Input() date: string;
  @Input() soughts: string[] = [];
  @Input() requested: string;
  @Input() ward: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() state: string;
  @Input() editUrl: string;

  onDelete() {
    this.delete.emit();
  }
}
