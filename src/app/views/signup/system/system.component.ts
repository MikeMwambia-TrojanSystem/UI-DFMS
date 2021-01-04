import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemSignupComponent {
  form = new FormGroup({
    group: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  }); // Form group that holds username and password from user input
  groups = ['Assembly Personnel']; // Options of Account Group select
  roles = {
    Clerk: [
      'Receives Statements',
      'Receives Petitions',
      'Receives Bills',
      'Makes Approvel incase speaker is unvailable',
      'Publishes all system generated documents to the speaker i.e order paper, vote books, acts, bills, motions, reports and petitions even the ones uploaded',
      'Manage drafter accounts',
      'Makes changes to committes',
      'Approves correspondent letter',
    ],
    Staff: [
      'Generate Order Paper',
      'Generate Vote book',
      'Generate Reports',
      'Generate Motion',
      'Upload and file an act',
      'Upload and file a bill',
      'Upload and file a statement',
      'Upload and file a Petition',
      'Create assembly committee',
      'Create assembly staff profiles',
      'Create assembly member profiles',
      'Generate correspondent letter',
      'Raise Notice of Motions',
    ],
    Speaker: [
      'Approves published order papers',
      'Approves published Vote books',
      'Approves uploaded act',
      'Receives raised petitions and approves',
      'Receives raised statements and approves',
      'Approves published reports',
      'Request MCA Changes',
      'Request Commitee Changes and Approve changes',
      'Enable and Disable Accounts',
    ],
  };
  notes = {
    Speaker:
      'Roles are inactive if they are delegated to a different account within the system',
  };

  getNote(role: string): string {
    if (!role || !this.notes[role]) {
      return undefined;
    }
    return this.notes[role];
  }
}
