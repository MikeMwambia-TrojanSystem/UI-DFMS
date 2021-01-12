import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-committee',
  templateUrl: './create-committee.component.html',
  styleUrls: ['./create-committee.component.scss'],
})
export class CreateCommitteeComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    members: new FormArray(
      [
        new FormControl('King Topsy'),
        new FormControl('Lawrence Mike'),
        new FormControl('Rebbyt Kings'),
      ],
      Validators.required
    ), // Predefined members, can be clear later
  }); // Form group that holds user input

  /**
   * Getter to get the number of members
   */
  get numberOfMembers(): number {
    return (this.form.get('members') as FormArray).length;
  }

  /**
   * Getter to get the array of members name
   */
  get members(): string[] {
    return this.form.get('members').value;
  }

  county = 'Meru'; // Dynamic county name;
}
