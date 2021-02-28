import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { CacheService } from 'src/app/services/cache.service';
import { CommitteeService } from 'src/app/services/committee.service';
import { McaEmployeeService } from 'src/app/services/mca-employee.service';
import { Committee, CommitteePost } from 'src/app/shared/types/committee';

interface CommitteeForm {
  committeeSignature: string;
  name: string;
  Chairname: string;
  chairId: string;
  viceChair: string;
  viceChairId: string;
  committesMembers: string[];
  departmentInExcecutive: string;
  approverId: string;
  published: boolean;
  assemblyId: string;
}

@Component({
  selector: 'app-create-committee',
  templateUrl: './create-committee.component.html',
  styleUrls: ['./create-committee.component.scss'],
})
export class CreateCommitteeComponent implements OnInit {
  private _mode: 'editing' | 'creating';
  private _committeeId: string;
  private _cacheId: string;
  form = new FormGroup({
    commiteeSignature: new FormControl(
      'e3ee3r9j5j5jgnonr5t46yg668h',
      Validators.required
    ),
    name: new FormControl('', Validators.required),
    Chairname: new FormControl('', Validators.required),
    chairId: new FormControl('', Validators.required),
    viceChair: new FormControl('', Validators.required),
    viceChairId: new FormControl('', Validators.required),
    committesMembers: new FormArray([]),
    departmentInExcecutive: new FormControl('', Validators.required),
    approverId: new FormControl('2c82d1f29d2f1ce', Validators.required),
    published: new FormControl(false),
    assemblyId: new FormControl('2c82d1f29d2f1ce', Validators.required),
    account: new FormControl('Speaker', Validators.required),
    datePublished: new FormControl(''),
  }); // Form group that holds user input

  membersName: { name: string; _id: string }[] = []; // Committees Memebers name.

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private committeeService: CommitteeService,
    private mcaEmployeeService: McaEmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get cache id from query url
    this._cacheId = this.route.snapshot.queryParams.id;

    // Populate committee data from resolver using param id
    const committeeId = this.route.snapshot.params.id;

    if (committeeId) {
      this._mode = 'editing';
      this._committeeId = committeeId;

      this.route.data
        .pipe(take(1))
        .subscribe(({ committee }: { committee: Committee }) => {
          const { committesMembers, ...others } = committee;

          for (const member of committesMembers) {
            (this.form.get('committesMembers') as FormArray).push(
              new FormControl(member)
            );
          }

          this.form.patchValue({
            ...others,
            Chairname: committee.chair.name,
            chairId: committee.chair.id,
            viceChair: committee.viceChair.name,
            viceChairId: committee.viceChair.id,
            approverId: committee.approvingAccount.approverId,
            account: committee.approvingAccount.account,
          });
        });
    } else {
      this._mode = 'creating';
    }

    // Rehydrate cached form data if there's any
    const cachedForm = this.cacheService.rehydrate<FormGroup>(
      'CREATE_COMMITTEE'
    );

    if (cachedForm) {
      this.form = cachedForm;
    }

    // Update members name from form committesMembers ids
    this.updateMembersList();
  }

  county = 'Meru'; // Dynamic county name;

  get chairmanName(): string {
    return this.form.get('Chairname').value;
  }

  get viceChairName(): string {
    return this.form.get('viceChair').value;
  }

  get departmentInExcecutive(): string {
    return this.form.get('departmentInExcecutive').value;
  }

  async updateMembersList() {
    const names: { name: string; _id: string }[] = [];
    const {
      committesMembers,
      chairId,
      viceChair,
      Chairname,
      viceChairId,
    } = this.form.value as CommitteeForm;

    for (const memberId of committesMembers.filter(
      (memberId) => memberId !== chairId && memberId !== viceChairId
    )) {
      const name = await this.mcaEmployeeService
        .getMcaEmployee(memberId)
        .pipe(
          take(1),
          map((employee) => employee.name)
        )
        .toPromise();

      names.push({
        name,
        _id: memberId,
      });
    }

    if (Chairname) {
      this.membersName.push({
        name: Chairname,
        _id: chairId,
      });
    }
    if (viceChair && chairId !== viceChairId) {
      this.membersName.push({
        name: viceChair,
        _id: viceChairId,
      });
    }

    this.membersName = [...this.membersName, ...names];
  }

  /**
   * This function get called when 'Select Chairman' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the employee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectChairman() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      this.form,
      this.router.createUrlTree(['/create/committee', this._committeeId], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (form, { _id, name }) => {
        form.patchValue({
          Chairname: name,
          chairId: _id,
        }); // Patch cached form with new chairman information.

        return form;
      }
    );

    // Navigate the user to '/list/mca-employee?select=true'
    this.router.navigate(['/list/mca-employee'], {
      queryParams: { select: true, id: 'CREATE_COMMITTEE' },
    });
  }

  /**
   * This function get called when 'Select Vice Chairman' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the employee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectViceChairman() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      this.form,
      this.router.createUrlTree(['/create/committee', this._committeeId], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (form, { _id, name }) => {
        form.patchValue({
          viceChair: name,
          viceChairId: _id,
        }); // Patch cached form with new vice chairman information.

        return form;
      }
    );

    // Navigate the user to '/list/mca-employee?select=true'
    this.router.navigate(['/list/mca-employee'], {
      queryParams: { select: true, id: 'CREATE_COMMITTEE' },
    });
  }

  /**
   * This function get called when 'Select Members' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-employee?select=true'.
   * After the user had selected the employee, a callback function will get called and update the cached data with the selected information.
   */
  onSelectMember() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      this.form,
      this.router.createUrlTree(['/create/committee', this._committeeId], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (form, { _id, name }) => {
        const membersControl = form.get('committesMembers') as FormArray; // Get the committesMembers control

        const members = [
          ...(membersControl.value as string[]).filter((id) => id !== _id),
          _id,
        ]; // Prevent duplication in id

        membersControl.clear(); // Clear all the cached member IDs.

        for (const member of members) {
          membersControl.push(new FormControl(member));
        } // Set the committesMembers control to the new array.

        return form;
      }
    );

    // Navigate the user to '/list/mca-employee?select=true'
    this.router.navigate(['/list/mca-employee'], {
      queryParams: { select: true, id: 'CREATE_COMMITTEE' },
    });
  }

  /**
   * This function get called when 'Select Department' button is clicked.
   * Caching the form and then redirect the user to '/list/department?select=true'.
   * After the user had selected the department, a callback function will get called and update the cached data with the selected information.
   */
  onSelectDepartment() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { _id: string; name: string }>(
      'CREATE_COMMITTEE',
      this.form,
      this.router.createUrlTree(['/create/committee', this._committeeId], {
        queryParams: {
          id: this._cacheId,
        },
      }),
      (form, { _id, name }) => {
        form.patchValue({
          departmentInExcecutive: name,
        }); // Patch cached form with new department information.

        return form;
      }
    );

    // Navigate the user to '/list/department?select=true'
    this.router.navigate(['/list/department'], {
      queryParams: { select: true, id: 'CREATE_COMMITTEE' },
    });
  }

  /**
   * This function get called when 'Save Committee' or 'Save as Draft' buttons is clicked.
   */
  onSave(published: boolean): void {
    // Subcription callback
    const subCallback = () => {
      if (this._cacheId) {
        this.cacheService.emit(this._cacheId, null);
      } else {
        this.router.navigate(['/list/committee'], {
          queryParams: {
            state: published ? 'published' : 'draft',
          },
        });
      }
    };

    // Transform form committesMembers ID array into a single ID string for API parameter.
    const transform = () => {
      const value = this.form.value as CommitteePost;

      return (
        `${value.chairId}&&&${value.viceChairId}` +
        ((value.committesMembers as unknown) as string[])
          .filter(
            (member) => member !== value.chairId && member !== value.viceChairId
          )
          .reduce(
            (result, currentMemberId) => `${result}&&&${currentMemberId}`,
            ''
          )
      );
    };

    const value = this.form.value;

    value.published = published;
    value.committesMembers = transform();

    if (this._mode === 'creating') {
      value.datePublished = new Date().toISOString();

      this.committeeService.postCommittee(value).subscribe(subCallback);
    } else {
      value.id = this._committeeId;

      this.committeeService.updateCommittee(value).subscribe(subCallback);
    }
  }

  /**
   * This function get called when 'Delete' button at member list is clicked
   */
  onMemberDelete(memberId: string) {
    const { chairId, viceChairId, committesMembers } = this.form
      .value as CommitteeForm;

    if (memberId === chairId) {
      this.form.get('chairId').setValue('');
      this.form.get('Chairname').setValue('');
    }

    if (memberId === viceChairId) {
      this.form.get('viceChairId').setValue('');
      this.form.get('viceChair').setValue('');
    }

    const formIndex = committesMembers.findIndex((id) => id === memberId);
    (this.form.get('committesMembers') as FormArray).removeAt(formIndex);

    const index = this.membersName.findIndex(
      (member) => member._id === memberId
    );
    this.membersName.splice(index, 1);
  }
}
