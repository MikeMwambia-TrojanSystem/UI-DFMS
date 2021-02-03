import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  county = 'Meru'; // Field for dynamic county
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  }); // Form group that holds username and password from user input

  constructor(private router: Router) {}

  onLogin() {
    // Predefined valid value. This value should be replace as a post request to the server to check if credentials is correct or not.
    const valid = true;

    if (valid) {
      this.router.navigate(['/signup/county']);
    }
  }
}
