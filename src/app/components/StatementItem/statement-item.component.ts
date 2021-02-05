import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statement-item',
  templateUrl: './statement-item.component.html',
  styleUrls: ['./statement-item.component.scss'],
})
export class StatementItemComponent {
  @Input() title: string;
  @Input() date: string;
  @Input() soughts: string[] = [];
  @Input() requested: string;
  @Input() ward: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() status: string;
  @Input() state: string;
}
