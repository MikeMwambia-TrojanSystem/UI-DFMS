import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
})
export class InfoItemComponent {
  @Input() title: string;
  @Input() date: string;
  @Input() subjects: string[] = [];
  @Input() sponsored: string;
  @Input() ward: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() status: string;
  @Input() state: string;
}
