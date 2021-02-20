import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
})
export class InfoItemComponent implements OnInit {
  @Input() title: string;
  @Input() date: string;
  @Input() subjects: string[] = [];
  @Input() sponsored: string;
  @Input() ward: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() status: string;
  @Input() state: string;
  @Input() editUrl: string;
  @Output() delete = new EventEmitter<void>();
  stateExpanded: string;

  ngOnInit() {
    if (this.state === 'draft') {
      this.stateExpanded = 'Draft';
    }
    if (this.state === 'public') {
      this.stateExpanded = 'Publicly Published';
    }
    if (this.state === 'private') {
      this.stateExpanded = 'Privately Published';
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
