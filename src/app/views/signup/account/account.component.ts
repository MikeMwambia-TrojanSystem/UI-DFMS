import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountSignupComponent {
  form = new FormGroup({
    role: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  }) // Form group that holds username and password from user input
}
