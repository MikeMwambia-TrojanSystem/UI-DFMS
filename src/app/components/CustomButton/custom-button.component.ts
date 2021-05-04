import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() title: string;
  @Input() unClickable: boolean;
  @Input() url: string[];
  @Input() query: Record<string, string>;
  @Input() form: FormGroup | FormControl;
  @Input() disabled: boolean;

  onIconClick(): void {
    if (!this.url && !this.disabled) {
      this.buttonClick.emit();
    }
  }
}
