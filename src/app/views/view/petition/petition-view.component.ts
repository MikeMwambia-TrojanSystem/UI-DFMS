import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';
import _ from 'lodash';

import { Petition } from 'src/app/shared/types/petition';

@Component({
  templateUrl: './petition-view.component.html',
  styleUrls: ['./petition-view.component.scss'],
})
export class PetitionViewComponent implements OnInit {
  form = this.fb.group({
    petitionSignature: [{ value: '', disabled: true }],
    content: [{ value: '', disabled: true }],
    sponsorName: [{ value: '', disabled: true }],
    department: [{ value: '', disabled: true }],
    relatedTo: [{ value: '', disabled: true }],
    orderPaperId: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    sponsorId: [{ value: '', disabled: true }],
    // approverId: [{ value: '', disabled: true }],
    // account: [{ value: '', disabled: true }],
    concernedCommitee: [{ value: '', disabled: true }],
    concernedCommiteeId: [{ value: '', disabled: true }],
    dateCommitteResponse: [{ value: '', disabled: true }],
    datePresented: [{ value: '', disabled: true }],
    dateToBDiscussed: [{ value: '', disabled: true }],
    petitioners: [{ value: '', disabled: true }],
    uploaded: [{ value: false, disabled: true }],
    uploadedFileURL: [{ value: '', disabled: true }],
    // uploader: [{ value: '', disabled: true }],
    // uploaderId: [{ value: '', disabled: true }],
    petitionNumber: [{ value: '', disabled: true }],
  });

  petitionersName: string[] = [];
  authorName: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ petition }: { petition: Petition }) => {
        const {
          approvingAccount,
          concernedCommitee,
          dateCommitteResponse,
          datePresented,
          dateToBDiscussed,
          petitioners,
          sponsoredBy,
          uploadingAccount,
          authorName,
          ...others
        } = petition;

        this.form.patchValue({
          ...others,
          sponsorName: sponsoredBy.sponsorName,
          sponsorId: sponsoredBy.sponsorId,
          // approverId: approvingAccount.approverId,
          //           account: approvingAccount.account,
          concernedCommitee: concernedCommitee.name,
          concernedCommiteeId: concernedCommitee.id,
          dateCommitteResponse: moment(dateCommitteResponse)
            .toJSON()
            .slice(0, 10),
          datePresented: moment(datePresented).toJSON().slice(0, 10),
          dateToBDiscussed: moment(dateToBDiscussed).toJSON().slice(0, 10),
          petitioners: petitioners.join('&&&'),
          // uploader: uploadingAccount.name,
          // uploaderId: uploadingAccount.id,
        });

        this.authorName = authorName;
      });

    // Update petitioners name from form ids
    this.updatePetitionersList();
  }

  get fileName(): string {
    try {
      const url = this.form.value.uploadedFileURL as string;
      return url.substring(url.lastIndexOf('amazonaws') + 14);
    } catch (error) {
      return undefined;
    }
  }

  get fileUrl(): string {
    return this.form.value.uploadedFileURL as string;
  }

  async updatePetitionersList() {
    let petitioners = (this.form.value.petitioners as string).split('&&&');

    petitioners = petitioners[0].length ? petitioners : [];

    for (const p of petitioners) {
      this.petitionersName.push(
        p.match(/(?<=name=).+?(?=\|\|\|)/g)
          ? p.match(/(?<=name=).+?(?=\|\|\|)/g)[0]
          : ''
      );
    }
  }
}
