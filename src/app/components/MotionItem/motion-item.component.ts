import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-motion-item',
  templateUrl: './motion-item.component.html',
  styleUrls: ['./motion-item.component.scss'],
})
export class MotionItemComponent implements OnInit {
  @Input() content: string;
  @Input() sponsored: string;
  @Input() relatedTo: string;
  @Input() department: string;
  @Input() date: string;
  @Input() selectable: boolean;
  @Input() state: string;
  @Input() editUrl: string;
  @Input() viewUrl: string;
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();
  stateExpanded: string;

  ngOnInit() {
    if (this.state === 'draft') {
      this.stateExpanded = 'Draft';
    }
    if (this.state === 'public') {
      this.stateExpanded = 'Public';
    }
    if (this.state === 'private') {
      this.stateExpanded = 'Private';
    }
  }

  onDelete() {
    this.delete.emit();
  }

  onSelect() {
    this.select.emit();
  }
}
