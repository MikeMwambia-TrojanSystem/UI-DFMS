import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { BillService } from 'src/app/services/bill.service';
import { Act } from 'src/app/shared/types/act';

@Component({
  templateUrl: './act-view.component.html',
  styleUrls: ['./act-view.component.scss'],
})
export class ActViewComponent implements OnInit {
  form = this.fb.group({
    titleOfAct: [{ value: '', disabled: true }],
    actNo: [{ value: '', disabled: true }],
    actsSignature: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    uploaded: [{ value: false, disabled: true }],
    uploadedFileURL: [{ value: '', disabled: true }],
    uploadAccount: [{ value: '', disabled: true }],
    approvingAcc: [{ value: '', disabled: true }],
    originatingBTitle: [{ value: '', disabled: true }],
    orderPaperId: [{ value: '', disabled: true }],
    sponsorId: [{ value: '', disabled: true }],
    concernedCommiteeId: [{ value: '', disabled: true }],
    relatedTo: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    sponsorName: [{ value: '', disabled: true }],
    uploadId: [{ value: '', disabled: true }],
    approvingAccId: [{ value: '', disabled: true }],
    billId: [{ value: '', disabled: true }],
    committeeName: [{ value: '', disabled: true }],
    committeeNameId: [{ value: '', disabled: true }],
    publishState: [{ value: '', disabled: true }],
    billNo: [{ value: '', disabled: true }],
  });

  authorName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(({ act }: { act: Act }) => {
      const {
        approvingAccount,
        concernedCommiteeId,
        originatingBillId,
        sponsorId,
        uploadingAccount,
        datePublished,
        authorName,
        ...others
      } = act;

      // Get the selected bill no

      this.billService
        .getBill(originatingBillId.originatingBId)
        .pipe(take(1))
        .subscribe((bill) => {
          this.form.patchValue({
            ...others,
            datePublished: moment(datePublished).toJSON().slice(0, 10),
            uploadAccount: uploadingAccount.uploadAccount,
            uploadId: uploadingAccount.uploadId,
            approvingAcc: approvingAccount.approvingAcc,
            approvingAccId: approvingAccount.approvingAccId,
            originatingBTitle: originatingBillId.originatingBTitle,
            billId: originatingBillId.originatingBId,
            sponsorId: sponsorId.sponsorId,
            sponsorName: sponsorId.sponsorName,
            concernedCommiteeId: concernedCommiteeId.committeeNameId,
            committeeName: concernedCommiteeId.committeeName,
            committeeNameId: concernedCommiteeId.committeeNameId,
            billNo: bill.billNo,
          });
        });

      this.authorName = authorName;
    });
  }

  get fileUrl(): string {
    return this.form.value.uploadedFileURL as string;
  }

  get fileName(): string {
    const url = this.form.value.uploadedFileURL as string;
    return url.substring(url.lastIndexOf('amazonaws.com/') + 14);
  }
}
