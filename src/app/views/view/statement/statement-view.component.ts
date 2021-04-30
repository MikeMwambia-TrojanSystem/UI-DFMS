import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { Statement } from 'src/app/shared/types/statement';

@Component({
  templateUrl: './statement-view.component.html',
  styleUrls: ['./statement-view.component.scss'],
})
export class StatementViewComponent implements OnInit {
  form = this.fb.group({
    statementSignature: [{ value: '', disabled: true }],
    statementNo: [{ value: '', disabled: true }],
    seeker: [{ value: '', disabled: true }],
    seekerId: [{ value: '', disabled: true }],
    subjectOfStatement: [{ value: '', disabled: true }],
    statementProvider: [{ value: '', disabled: true }],
    statementProviderId: [{ value: '', disabled: true }],
    department: [{ value: '', disabled: true }],
    departmentResponsible: [{ value: '', disabled: true }],
    dateStatementSought: [{ value: '', disabled: true }],
    dateStatementToResponded: [{ value: '', disabled: true }],
    uploaded: [{ value: '', disabled: true }],
    uploadedFileURL: [{ value: '', disabled: true }],
    status: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    published: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    publishState: [{ value: '', disabled: true }],
    seekerDescription: [{ value: '', disabled: true }],
  });

  filename: string;
  authorName: string;
  approver: string;
  approvedAt: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Populate statement data from resolver using param statementId

    this.route.data
      .pipe(take(1))
      .subscribe(({ statement }: { statement: Statement }) => {
        const {
          seeker,
          statementProvider,
          dateStatementSought,
          dateStatementToResponded,
          seekerDescription,
          title,
          authorName,
          approver,
          updatedAt,
          ...others
        } = statement;

        this.form.patchValue({
          ...others,
          statementNo: title ? title.toString() : '',
          seeker: seeker.name || '',
          seekerId: seeker.id || '',
          seekerDescription: seekerDescription || '',
          department: statementProvider.department || '',
          statementProviderId: statementProvider.id || '',
          statementProvider: statementProvider.name || '',
          dateStatementSought:
            moment(dateStatementSought).toJSON().slice(0, 10) || '',
          dateStatementToResponded:
            moment(dateStatementToResponded).toJSON().slice(0, 10) || '',
        });

        this.authorName = authorName;
        this.approver = approver;
        this.approvedAt = moment(updatedAt).format('Do MMMM YYYY');
      });
  }

  get fileUrl(): string {
    return this.form.get('uploadedFileURL').value;
  }
}
