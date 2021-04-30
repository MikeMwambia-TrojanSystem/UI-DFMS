import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { take } from 'rxjs/operators';

import { BillService } from 'src/app/services/bill.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { PetitionService } from 'src/app/services/petition.service';
import { StatementService } from 'src/app/services/statement.service';
import { Personnel } from 'src/app/shared/types/personnel';
import { Report } from 'src/app/shared/types/report';

@Component({
  templateUrl: './report-document-view.component.html',
  styleUrls: ['./report-document-view.component.scss'],
})
export class ReportDocumentViewComponent {
  form = this.fb.group({
    reportSignature: [{ value: '', disabled: true }],
    titleOfReport: [{ value: '', disabled: true }],
    authorCommitee: [{ value: '', disabled: true }],
    authorCommiteeId: [{ value: '', disabled: true }],
    dueDate: [{ value: '', disabled: true }],
    originatingDocType: [{ value: '', disabled: true }],
    originatingDocTypeId: [{ value: '', disabled: true }],
    editors: [{ value: '', disabled: true }],
    uploaded: [{ value: false, disabled: true }],
    uploadedFileURL: [{ value: '', disabled: true }],
    uploadingAccount: [{ value: '', disabled: true }],
    uploaderId: [{ value: '', disabled: true }],
    account: [{ value: '', disabled: true }],
    approverId: [{ value: '', disabled: true }],
    annexusName: [{ value: '', disabled: true }],
    annexusId: [{ value: '', disabled: true }],
    uploadedAnexux: [{ value: false, disabled: true }],
    uploadingUrl: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    orderPaperId: [{ value: '', disabled: true }],
    relatedTo: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    publishState: [{ value: '', disabled: true }],
  });

  originatings = ['petition', 'statement', 'bill'];
  originatingsTitle = ['Petitions', 'Statements', 'Bills'];
  editors: Personnel[] = [];
  originatingName = '';
  report: File;
  reportName: string;
  reportUrl: string;
  annexus: File;
  annexusName: string;
  annexusUrl: string;
  authorName: string;
  approver: string;
  approvedAt: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private petitionService: PetitionService,
    private statementService: StatementService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ report }: { report: Report }) => {
        const {
          annexus,
          approvingAccount,
          authorCommitee,
          originatingDocument,
          dueDate,
          uploadingAccount,
          editors,
          uploadedFileURL,
          title,
          authorName,
          approver,
          updatedAt,
          ...others
        } = report;

        this.form.patchValue({
          ...others,
          authorCommitee: authorCommitee.name,
          authorCommiteeId: authorCommitee.id,
          dueDate: moment(dueDate).toJSON().slice(0, 10),
          originatingDocType: originatingDocument.type,
          originatingDocTypeId: originatingDocument.id,
          editors: editors.join('&&&'),
          uploadingAccount: uploadingAccount.name,
          uploaderId: uploadingAccount.id,
          account: approvingAccount.account,
          approverId: approvingAccount.approverId,
          annexusName: annexus.name,
          annexusId: annexus.id,
          uploadedAnexux: annexus.uploaded,
          uploadingUrl: annexus.uploadingUrl,
          uploadedFileURL: uploadedFileURL,
          titleOfReport: title,
        });

        this.reportName = uploadedFileURL.length
          ? uploadedFileURL.substring(
              uploadedFileURL.lastIndexOf('amazonaws.com/') + 14
            )
          : undefined;
        this.reportUrl = uploadedFileURL;

        this.annexusName = annexus.name;
        this.annexusUrl = annexus.uploadingUrl;
        this.authorName = authorName;
        this.approver = approver;
        this.approvedAt = moment(updatedAt).format('Do MMMM YYYY');
      });

    // Updating information when first time opening this page
    this.updateEditors();
    this.updateOriginating();
  }

  get originating(): string {
    const type = this.form.value.originatingDocType;
    switch (type) {
      case 'petition':
        return 'Petitions';
      case 'statement':
        return 'Statements';
      case 'bill':
        return 'Bills';
    }
  }

  get committee(): string {
    return this.form.value.authorCommitee;
  }

  // Get the editors name from editor ids field
  updateEditors() {
    const editorsStr = this.form.value.editors as string;
    const editorIds = editorsStr.split('&&&');
    let editors = [];

    for (const id of editorIds) {
      if (id.length) {
        this.personnelService
          .getPersonnel(id)
          .pipe(take(1))
          .subscribe((personnel) => {
            if (personnel) {
              editors.push(personnel);
            }
          });
      }
    }

    this.editors = editors;
  }

  // Handling originating document
  updateOriginating() {
    const id = this.form.value.originatingDocTypeId as string;
    const type = this.form.value.originatingDocType as
      | 'petition'
      | 'bill'
      | 'statement';

    if (id.length) {
      // Reset the originating document whenever the document type changed
      this.originatingName = '';

      // Get originating document
      if (type === 'petition') {
        this.petitionService
          .getPetition(id)
          .pipe(take(1))
          .subscribe((petition) => {
            this.originatingName = petition ? petition.content : '';
          });
      }
      if (type === 'bill') {
        this.billService
          .getBill(id)
          .pipe(take(1))
          .subscribe((bill) => {
            this.originatingName = bill ? bill.title : '';
          });
      }
      if (type === 'statement') {
        this.statementService
          .getStatement(id)
          .pipe(take(1))
          .subscribe((statement) => {
            this.originatingName = statement
              ? statement.subjectOfStatement
              : '';
          });
      }
    }
  }
}
