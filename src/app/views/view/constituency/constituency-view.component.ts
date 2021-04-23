import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Constituency } from 'src/app/shared/types/ward-con-sub';

@Component({
  templateUrl: './constituency-view.component.html',
  styleUrls: ['./constituency-view.component.scss'],
})
export class ConstituencyViewComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '', disabled: true }],
    subCounty: [{ value: '', disabled: true }],
    type: [{ value: 'constituency', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;
  authorName: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1))
      .subscribe(({ constituency }: { constituency: Constituency }) => {
        this.form.patchValue({
          ...constituency,
        });

        this.authorName = constituency.authorName;
      });
  }
}
