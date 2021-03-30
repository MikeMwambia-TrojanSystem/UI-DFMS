import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    group: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isRemember: new FormControl(false),
  }); // Form group that holds username and password from user input

  constructor(private accountService: AccountService, private router: Router) {}

  onLogin() {
    const { username, password, group } = this.form.value;

    this.accountService.login({ username, password, group }).subscribe(() => {
      this.router.navigate(['/intro']);
    });
  }
}
