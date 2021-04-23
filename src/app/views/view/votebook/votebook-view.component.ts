import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { take } from 'rxjs/operators';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { Votebook } from 'src/app/shared/types/votebook';

type Cache = {
  form: FormGroup;
};

@Component({
  templateUrl: './votebook-view.component.html',
  styleUrls: ['./votebook-view.component.scss'],
})
export class VotebookViewComponent implements OnInit {
  form = this.fb.group({
    orderPaperId: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    assemblyNo: [{ value: '', disabled: true }],
    orderPapersNo: [{ value: '', disabled: true }],
    pageNoToDate: [{ value: '', disabled: true }],
    sessionNo: [{ value: '', disabled: true }],
    votebookNo: [{ value: '', disabled: true }],
    presiding: [{ value: '', disabled: true }],
    presidingPosition: [{ value: '', disabled: true }],
    presidingId: [{ value: '', disabled: true }],
  });
  id: string;
  authorName: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get resolved order paper data
    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          votebook,
          orderPaper,
        }: {
          votebook: Votebook;
          orderPaper: OrderPaper;
        }) => {
          this.id = votebook._id;

          const { presiding, ...others } = votebook;

          this.form.patchValue({
            ...others,
            pageNoToDate: orderPaper.pageNoToDate,
            orderPaperId: orderPaper._id,
            presiding: presiding.name,
            presidingPosition: presiding.position,
            presidingId: presiding.id,
          });

          this.authorName = votebook.authorName;
        }
      );
  }

  get orderPaperNo(): string {
    return `${this.form.get('orderPapersNo').value}`;
  }

  get presidingPosition():
    | 'Speaker of the Assembly'
    | 'Member of the Speaker Parliament' {
    return this.form.get('presidingPosition').value;
  }

  get memberName(): string {
    return this.form.get('presiding').value as string;
  }
}
