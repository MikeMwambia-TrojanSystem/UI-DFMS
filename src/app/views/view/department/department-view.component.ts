import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { Department } from 'src/app/shared/types/department';

@Component({
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss'],
})
export class DepartmentViewComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    members: [{ value: [], disabled: true }],
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;
  authorName: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1))
      .subscribe(({ department }: { department: Department }) => {
        const { members, authorName, ...others } = department;
        // const membersControl = this.form.get('members') as FormArray;

        // for (const member of members) {
        //   membersControl.push(new FormControl(member));
        // }

        this.form.patchValue({
          ...others,
        });

        this.authorName = authorName;
      });
  }
}
