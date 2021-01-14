import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-motion-item',
  templateUrl: './motion-item.component.html',
  styleUrls: ['./motion-item.component.scss'],
})
export class MotionItemComponent {
  @Input() title: string;
  @Input() date: string;
  @Input() subjects: string[] = [];
  @Input() sponsored: string;
  @Input() ward: string;
}
