import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-communication-item',
  templateUrl: './communication-item.component.html',
  styleUrls: ['./communication-item.component.scss'],
})
export class CommunicationItemComponent {
  @Input() title: string;
  @Input() date: string;
  @Input() state: string;
  @Input() selectable: boolean;
  @Input() sub: string;
}
