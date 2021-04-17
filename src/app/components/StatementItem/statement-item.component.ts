import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type StatementInfo = {
  label: string;
  content: string;
  class?: {
    label?: string;
    content?: string;
    common?: string;
  };
};

@Component({
  selector: 'app-statement-item',
  templateUrl: './statement-item.component.html',
  styleUrls: ['./statement-item.component.scss'],
})
export class StatementItemComponent implements OnInit {
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();
  @Input() selectable: boolean;
  @Input() state: string;
  @Input() editUrl: string;
  @Input() info: StatementInfo[];
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  extendedState: string;

  ngOnInit() {
    switch (this.state) {
      case 'draft':
        this.extendedState = 'Draft';
        break;
      case 'private':
        this.extendedState = 'Private';
        break;
      case 'public':
        this.extendedState = 'Public';
        break;
      default:
        break;
    }
  }

  onDelete() {
    this.delete.emit();
  }

  onSelect() {
    this.select.emit();
  }
}
