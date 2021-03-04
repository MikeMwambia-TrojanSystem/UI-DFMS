import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-management-item',
  templateUrl: './management-item.component.html',
  styleUrls: ['./management-item.component.scss'],
})
export class ManagementItemComponent {
  @Output() select = new EventEmitter<void>();
  @Input() pic: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() selectable: boolean;
  @Input() noDivider: boolean;
  @Input() state: string;

  onSelect(): void {
    this.select.emit();
  }
}
