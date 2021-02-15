import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';

interface CacheData {
  form: FormGroup;
  membersName: string[];
}

@Component({
  selector: 'app-create-committee',
  templateUrl: './create-committee.component.html',
  styleUrls: ['./create-committee.component.scss'],
})
export class CreateCommitteeComponent implements OnInit {
  form = new FormGroup({
    committeeSignature: new FormControl(
      'e3ee3r9j5j5jgnonr5t46yg668h',
      Validators.required
    ),
    name: new FormControl('', Validators.required),
    Chairname: new FormControl('', Validators.required),
    chairId: new FormControl('', Validators.required),
    viceChair: new FormControl('', Validators.required),
    viceChairId: new FormControl('', Validators.required),
    committeesMembers: new FormArray([], Validators.required),
    departmentInExecutive: new FormControl('', Validators.required),
    approverId: new FormControl('2c82d1f29d2f1ce', Validators.required),
    published: new FormControl(false, Validators.required),
    assemblyId: new FormControl('2c82d1f29d2f1ce', Validators.required),
  }); // Form group that holds user input

  membersName: string[] = []; // Committees Memebers name.

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const data = this.cacheService.rehydrate<CacheData>('CREATE_COMMITTEE');

    if (data) {
      const { form, membersName } = data;

      this.form = form;
      this.membersName = membersName;
    }
  }

  county = 'Meru'; // Dynamic county name;

  get chairmanName(): string {
    return this.form.get('Chairname').value;
  }

  get viceChairName(): string {
    return this.form.get('viceChair').value;
  }

  onSelectChairman() {
    this.cacheService.cache<CacheData, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      { form: this.form, membersName: this.membersName },
      '/create/committee',
      (data, { _id, name }) => {
        const newData = {
          ...data,
        }; // A copy of the cached data.
        const membersControl = newData.form.get(
          'committeesMembers'
        ) as FormArray; // Get the committeesMembers control

        newData.membersName = [
          ...newData.membersName.filter(
            (name) => name !== newData.form.get('Chairname').value
          ),
          name,
        ]; // Replace the old chairman name with the new chairnam name.

        const members = [
          ...(membersControl.value as string[]).filter(
            (id) => id !== newData.form.get('chairId').value
          ),
          _id,
        ]; /* Create a new array that will be used to replace the cached form.
          Remove the old chairID and replace it with the new chairID */

        membersControl.clear(); // Clear all the cached member IDs.

        for (const member of members) {
          membersControl.push(new FormControl(member));
        } // Set the committeesMembers control to the new array.

        newData.form.patchValue({
          Chairname: name,
          chairId: _id,
        }); // Patch cached form with new chairman information.

        return newData;
      }
    );

    this.router.navigate(['/list/mca-employee'], {
      queryParams: { select: true },
    });
  }

  onSelectViceChairman() {
    this.cacheService.cache<CacheData, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      { form: this.form, membersName: this.membersName },
      '/create/committee',
      (data, { _id, name }) => {
        const newData = {
          ...data,
        }; // A copy of the cached data.
        const membersControl = newData.form.get(
          'committeesMembers'
        ) as FormArray; // Get the committeesMembers control

        newData.membersName = [
          ...newData.membersName.filter(
            (name) => name !== newData.form.get('viceChair').value
          ),
          name,
        ]; // Replace the old vice chairman name with the new vice chairnam name.

        const members = [
          ...(membersControl.value as string[]).filter(
            (id) => id !== newData.form.get('viceChairId').value
          ),
          _id,
        ]; /* Create a new array that will be used to replace the cached form.
          Remove the old viceChairID and replace it with the new viceChairID */

        membersControl.clear(); // Clear all the cached member IDs.

        for (const member of members) {
          membersControl.push(new FormControl(member));
        } // Set the committeesMembers control to the new array.

        newData.form.patchValue({
          viceChair: name,
          viceChairId: _id,
        }); // Patch cached form with new vice chairman information.

        return newData;
      }
    );

    this.router.navigate(['/list/mca-employee'], {
      queryParams: { select: true },
    });
  }

  onSelectMember() {
    this.cacheService.cache<CacheData, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      { form: this.form, membersName: this.membersName },
      '/create/committee',
      (data, { _id, name }) => {
        const newData = {
          ...data,
        }; // A copy of the cached data.
        const membersControl = newData.form.get(
          'committeesMembers'
        ) as FormArray; // Get the committeesMembers control

        newData.membersName = [
          ...newData.membersName.filter((memberName) => memberName !== name),
          name,
        ]; // Prevent duplication in name

        const members = [
          ...(membersControl.value as string[]).filter((id) => id !== _id),
          _id,
        ]; // Prevent duplication in id

        membersControl.clear(); // Clear all the cached member IDs.

        for (const member of members) {
          membersControl.push(new FormControl(member));
        } // Set the committeesMembers control to the new array.

        newData.form.patchValue({
          viceChair: name,
          viceChairId: _id,
        }); // Patch cached form with new members information.

        return newData;
      }
    );

    this.router.navigate(['/list/mca-employee'], {
      queryParams: { select: true },
    });
  }

  onSave(): void {
    this.cacheService.cache<FormGroup, boolean>(
      'CREATE_COMMITTEE',
      this.form,
      null,
      (cachedForm, selected) => {
        const value = this.form.value;

        value.published = selected; // Set published to selected mode
        value.committeesMembers = (value.committeesMembers as string[]).reduce(
          (result, currentID) => {
            if (result.length) {
              return `${result}&&&${currentID}`;
            }
            return currentID;
          },
          ''
        ); // Change the array of IDs to a single string for POST request

        this.apiService.createCommittee(value).subscribe(() => {
          this.router.navigate(['/list/committee']);
        });

        return cachedForm;
      }
    );

    this.router.navigate(['/publish-status/committee']);
  }
}
