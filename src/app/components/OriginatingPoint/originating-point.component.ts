import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-originating-point',
  templateUrl: './originating-point.component.html',
  styleUrls: ['./originating-point.component.scss'],
})
export class OriginatingPointComponent {
  @Input() label: string;
}
