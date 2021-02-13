import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CacheService } from 'src/app/services/cache.service';

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

  constructor(private cacheService: CacheService) {}

  onIconClick(): void {
    if (!this.url) {
      this.buttonClick.emit();
    }
  }
}
