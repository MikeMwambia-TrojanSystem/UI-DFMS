import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { BillService } from 'src/app/services/bill.service';
import { CacheService } from 'src/app/services/cache.service';
import { Bill } from 'src/app/shared/types/bill';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class VotebookBillPreviewComponent implements OnInit {
  content = new FormControl('', Validators.required);
  status = new FormControl({ value: '', disabled: true }, Validators.required);

  page = 'Order Paper on the Development of Kura';

  wordsNumber: number;
  bill: Bill;

  constructor(
    private cacheService: CacheService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    const { content, status, motionId } = this.cacheService.getData<{
      content: string;
      status: string;
      motionId: string;
    }>('EDIT_VOTEBOOK_PREVIEW');

    this.content.setValue(content);
    this.status.setValue(status);
    this.billService
      .getBills()
      .pipe(
        take(1),
        map((bills) => bills.find((b) => b._id === motionId))
      )
      .subscribe((bill) => {
        this.bill = bill;
      });

    this.wordsNumber = ((content && content.match(/ /g)) || []).length;

    if (
      content &&
      content.charAt(content.length - 1) !== ' ' &&
      content.length
    ) {
      this.wordsNumber++;
    }
  }

  onComplete() {
    this.cacheService.emit('EDIT_VOTEBOOK_PREVIEW', undefined);
  }
}
