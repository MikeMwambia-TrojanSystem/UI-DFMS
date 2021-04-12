import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { Personnel } from 'src/app/shared/types/personnel';
import { PhoneVerification } from 'src/app/shared/types/verification';

type Cache = {
  form: FormGroup;
  filename: string;
  verification?: PhoneVerification;
};

@Component({
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss'],
})
export class EmployeeViewComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '', disabled: true }],
    group: [{ value: '', disabled: true }],
    phoneNumber: [{ value: '', disabled: true }],
    dateCreated: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    profilePic: [{ value: '', disabled: true }],
    termOfService: [{ value: '', disabled: true }],
    signature: [{ value: '', disabled: true }],
    status: [{ value: false, disabled: true }],
    verified: [{ value: false, disabled: true }],
    educationLevel: [{ value: '', disabled: true }],
    emailAddress: [{ value: '', disabled: true }],
    extraQualification: [{ value: '', disabled: true }],
    deparment: [{ value: '', disabled: true }],
    deptId: [{ value: '', disabled: true }],
  });

  profilePic: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe(({ personnel }: { personnel: Personnel }) => {
        const { department, phoneNumber, profilePic, ...others } = personnel;

        this.form.patchValue({
          ...others,
          phoneNumber: phoneNumber.phoneNumber,
          deparment: department.name,
          deptId: department.id,
          profilePic: profilePic,
        });

        this.profilePic = profilePic;
      });
  }

  get department(): string {
    return this.form.value.deparment as string;
  }
}
