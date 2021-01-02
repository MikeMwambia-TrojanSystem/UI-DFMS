import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginSignupComponent {
  form = new FormGroup({
    role: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isRemember: new FormControl(false),
  }) // Form group that holds username and password from user input
}
