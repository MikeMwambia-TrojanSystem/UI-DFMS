import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() pic: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isSubDate: boolean;
  @Input() selectable: boolean;
  @Input() subcounty: string;
  @Input() dateSub: string;
  @Input() published: boolean;
  @Input() editUrl: string;
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();
  dateObj: Date;
  stateExpanded: string;

  ngOnInit() {
    if (this.isSubDate && this.subtitle) {
      this.dateObj = new Date(this.subtitle);
    }

    if (this.published) {
      this.stateExpanded = 'Published';
    } else {
      this.stateExpanded = 'Draft';
    }
  }

  onSelect() {
    this.select.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
