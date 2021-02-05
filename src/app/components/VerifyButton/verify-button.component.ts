import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-verify-button',
  templateUrl: './verify-button.component.html',
  styleUrls: ['./verify-button.component.scss'],
})
export class VerifyButtonComponent {
  @Output() click = new EventEmitter<null>();

  onClick(): void {
    this.click.emit();
  }
}
