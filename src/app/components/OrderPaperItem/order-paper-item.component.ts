import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-paper-item',
  templateUrl: './order-paper-item.component.html',
  styleUrls: ['./order-paper-item.component.scss'],
})
export class OrderPaperItemComponent implements OnInit {
  @Output() select = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
  @Input() number: number;
  @Input() date: string;
  @Input() views: string;
  @Input() selectable: boolean;
  @Input() sub: string;
  @Input() state: string;
  @Input() editUrl: string;
  @Input() viewUrl: string;
  @Input() id: string;
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  @Input() canApprove: boolean;
  stateExpanded: string;
  downloadUrl: string;

  constructor(private apiService: ApiService) {}

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

    this.downloadUrl = this.apiService.getDownloadOrderPaperUrl(this.id);
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
