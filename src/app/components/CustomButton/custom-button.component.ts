import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() title: string;
  @Input() unClickable: boolean;

  onIconClick(): void {
    this.buttonClick.emit();
  }
}
