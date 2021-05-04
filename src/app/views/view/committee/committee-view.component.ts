import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CommitteeService } from 'src/app/services/committee.service';
import { McaEmployeeService } from 'src/app/services/mca-employee.service';
import { Committee } from 'src/app/shared/types/committee';

@Component({
  styleUrls: ['./committee-view.component.scss'],
  templateUrl: './committee-view.component.html',
})
export class CommitteeViewComponent implements OnInit {
  private _id: string;

  form = this.fb.group({
    commiteeSignature: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: true }],
    Chairname: [{ value: '', disabled: true }],
    chairId: [{ value: '', disabled: true }],
    viceChair: [{ value: '', disabled: true }],
    viceChairId: [{ value: '', disabled: true }],
    committesMembers: [{ value: '', disabled: true }],
    departmentInExcecutive: [{ value: '', disabled: true }],
    approverId: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    account: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    clerkAssistant: [{ value: '', disabled: true }],
    clerkAssistantId: [{ value: '', disabled: true }],
  });
  membersName: { name: string; _id: string }[] = []; // Committees Memebers name.
  clerkAssistant: string[] = [];
  authorName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mcaEmployeeService: McaEmployeeService
  ) {}

  ngOnInit() {
    // Get params id
    this.route.data
      .pipe(take(1))
      .subscribe(({ committee }: { committee: Committee }) => {
        const { committesMembers, authorName, ...others } = committee;

        this.form.patchValue({
          ...others,
          Chairname: committee.chair.name,
          chairId: committee.chair.id,
          viceChair: committee.viceChair.name,
          viceChairId: committee.viceChair.id,
          approverId: committee.approvingAccount.approverId,
          account: committee.approvingAccount.account,
          committesMembers: committesMembers.join('&&&'),
        });

        const clerks = (committee.clerkAssistant || '').split('&&&');

        this.authorName = authorName;
        this.clerkAssistant = clerks[0].length ? clerks : [];

        // Update members name from form committesMembers ids
        this.updateMembersList();
      });
  }

  async updateMembersList() {
    const names: { name: string; _id: string }[] = [];
    const {
      committesMembers,
      chairId,
      viceChair,
      Chairname,
      viceChairId,
    } = this.form.value;

    let members = committesMembers.split('&&&');

    members = members.filter((m) => m.length);

    for (const memberId of members.filter(
      (memberId) => memberId !== chairId && memberId !== viceChairId
    )) {
      const name = await this.mcaEmployeeService
        .getMcaEmployee(memberId)
        .pipe(
          take(1),
          map((employee) => (employee ? employee.name : 'no Member Found'))
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
}
