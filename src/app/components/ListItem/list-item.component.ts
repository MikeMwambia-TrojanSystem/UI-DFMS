import { Component, Input, OnInit } from '@angular/core';

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
  dateObj: Date;

  ngOnInit() {
    if (this.isSubDate) {
      this.dateObj = new Date(this.subtitle);
    }
  }
}
