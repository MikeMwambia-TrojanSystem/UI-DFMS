import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-act-item',
  templateUrl: './act-item.component.html',
  styleUrls: ['./act-item.component.scss'],
})
export class ActItemComponent implements OnInit {
  @Input() title: string;
  @Input() date: string;
  @Input() relatedTo: string;
  @Input() number: number;
  @Input() sponsor: string;
  @Input() selectable: boolean;
  @Input() state: string;
  @Input() editUrl: string;
  @Input() viewUrl: string;
  @Input() department: string;
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  @Input() canApprove: boolean;
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
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

  onApprove() {
    this.approve.emit();
  }
}
