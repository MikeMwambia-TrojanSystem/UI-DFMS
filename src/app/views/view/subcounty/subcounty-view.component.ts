import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { SubCounty } from 'src/app/shared/types/ward-con-sub';

@Component({
  templateUrl: './subcounty-view.component.html',
  styleUrls: ['./subcounty-view.component.scss'],
})
export class SubcountyViewComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '', disabled: true }],
    type: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    date: [{ value: '', disabled: true }],
  });

  county = 'Meru'; // Dynamic county name;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1))
      .subscribe(({ subcounty }: { subcounty: SubCounty }) => {
        this.form.patchValue({
          ...subcounty,
        });
      });
  }
}
