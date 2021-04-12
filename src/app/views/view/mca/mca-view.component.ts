import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import moment from 'moment';

import { McaEmployee } from 'src/app/shared/types/mca-employee';

@Component({
  templateUrl: './mca-view.component.html',
  styleUrls: ['./mca-view.component.scss'],
})
export class McaViewComponent implements OnInit {
  form = this.fb.group({
    assemblyId: [{ value: '', disabled: true }],
    commiteesInvolved: [{ value: [], disabled: true }],
    dateCreated: [{ value: '', disabled: true }],
    group: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: true }],
    phoneNumber: [{ value: '', disabled: true }],
    politicalParty: [{ value: '', disabled: true }],
    positionStatus: [{ value: '', disabled: true }],
    profilePic: [{ value: '', disabled: true }],
    signature: [{ value: '', disabled: true }],
    status: [{ value: false, disabled: true }],
    termStart: [{ value: '', disabled: true }],
    termEnd: [{ value: '', disabled: true }],
    termOfService: [{ value: '', disabled: true }],
    ward: [{ value: '', disabled: true }],
    wardId: [{ value: '', disabled: true }],
  });

  profilePic: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(({ mca }: { mca: McaEmployee }) => {
      const { termOfService, ...others } = mca;
      const [termStart, termEnd] = termOfService.split(' to ');

      this.form.patchValue({
        ...others,
        termStart: moment(termStart, 'Do MMMM YYYY').toJSON().slice(0, 10),
        termEnd: moment(termEnd, 'Do MMMM YYYY').toJSON().slice(0, 10),
      });

      this.profilePic = mca.profilePic;
    });
  }
}
