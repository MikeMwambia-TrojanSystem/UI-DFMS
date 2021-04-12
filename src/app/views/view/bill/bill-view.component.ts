import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { Bill } from 'src/app/shared/types/bill';

@Component({
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss'],
})
export class BillViewComponent implements OnInit {
  form = this.fb.group({
    titleOfBill: [{ value: '', disabled: true }],
    billNo: [{ value: '', disabled: true }],
    billSignature: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    firstReadingDate: [{ value: '', disabled: true }],
    secondReadingDate: [{ value: '', disabled: true }],
    datePassed: [{ value: '', disabled: true }],
    uploaded: [{ value: false, disabled: true }],
    uploadedBillURL: [{ value: '', disabled: true }],
    approvingAcc: [{ value: '', disabled: true }],
    orderPaperId: [{ value: '', disabled: true }],
    sponsorId: [{ value: '', disabled: true }],
    sponsor: [{ value: '', disabled: true }],
    relatedTo: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    approvingAccId: [{ value: '', disabled: true }],
    committeeName: [{ value: '', disabled: true }],
    committeeNameId: [{ value: '', disabled: true }],
    billUploadedReportURL: [{ value: '', disabled: true }],
    status: [{ value: '', disabled: true }],
    uploadingPersonnel: [{ value: '', disabled: true }],
    publishStatus: [{ value: '', disabled: true }],
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(({ bill }: { bill: Bill }) => {
      const {
        approvingAccount,
        concernedCommiteeId,
        datePublished,
        firstReadingDate,
        secondReadingDate,
        sponsor,
        uploadingAccount,
        datePassed,
        ...others
      } = bill;

      this.form.patchValue({
        ...others,
        datePublished: moment(datePublished).toJSON().slice(0, 10),
        firstReadingDate: moment(firstReadingDate).toJSON().slice(0, 10),
        secondReadingDate: moment(secondReadingDate).toJSON().slice(0, 10),
        datePassed: moment(datePassed).toJSON().slice(0, 10),
        approvingAcc: approvingAccount.approvingAcc,
        sponsorId: sponsor.id,
        sponsor: sponsor.name,
        approvingAccId: approvingAccount.approvingAccId,
        committeeName: concernedCommiteeId.committeeName,
        committeeNameId: concernedCommiteeId.committeeNameId,
        uploadingPersonnel: uploadingAccount.uploadingPersonnel,
        uploadAccname: uploadingAccount.uploadAccname,
      });
    });
  }

  get billName(): string {
    const url = this.form.value.uploadedBillURL as string;
    return url.length
      ? url.substring(url.lastIndexOf('amazonaws.com/') + 14)
      : undefined;
  }

  get billUrl(): string {
    return this.form.value.uploadedBillURL as string;
  }

  get reportName(): string {
    const url = this.form.value.billUploadedReportURL as string;
    return url.length
      ? url.substring(url.lastIndexOf('amazonaws.com/') + 14)
      : undefined;
  }

  get reportUrl(): string {
    return this.form.value.billUploadedReportURL as string;
  }
}
