import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-management-item',
  templateUrl: './management-item.component.html',
  styleUrls: ['./management-item.component.scss'],
})
export class ManagementItemComponent {
  @Input() pic: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() selectable: boolean;
  @Input() noDivider: boolean;
}
