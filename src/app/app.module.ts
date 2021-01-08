import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/shared/material.module';

import { LoginComponent } from './views/login/login.component';
import { CountySignupComponent } from './views/signup/county/county.component';
import { AccountSignupComponent } from './views/signup/account/account.component';
import { EmailSignupComponent } from './views/signup/email/email.component';
import { SuccessSignupComponent } from './views/signup/success/success.component';
import { LoginSignupComponent } from './views/signup/login/login.component';
import { BackButtonComponent } from './components/BackButton/back-button.component';
import { SystemSignupComponent } from './views/signup/system/system.component';
import { NotificationsSignupComponent } from './views/signup/notifications/notifications.component';
import { EmailVerificationComponent } from './views/signup/email-verification/email-verification.component';
import { PhoneVerificationComponent } from './views/signup/phone-verification/phone-verification.component';
import { CreateCommitteeComponent } from './views/create/committee/create-committee.component';
import { CreateConstituenciesComponent } from './views/create/constituencies/create-constituencies.component';
import { CreateDepartmentComponent } from './views/create/department/create-department.component';
import { CreateEmployeeComponent } from './views/create/employee/create-employee.component';
import { CreateMcaComponent } from './views/create/mca/create-mca.component';
import { CreateSubcountyComponent } from './views/create/subcounty/create-subcounty.component';
import { CreateWardsComponent } from './views/create/wards/create-wards.component';
import { ListCommitteeComponent } from './views/list/committee/list-committee.component';
import { SearchBarComponent } from './components/SearchBar/search-bar.component';
import { ListItemComponent } from './components/ListItem/list-item.component';
import { CommonModule } from '@angular/common';
import { ListMcaEmployeeComponent } from './views/list/mca-employee/list-mca-employee.component';
import { ListPersonnelComponent } from './views/list/personnel/list-personnel.component';
import { ListWardsComponent } from './views/list/wards/list-wards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CountySignupComponent,
    AccountSignupComponent,
    EmailSignupComponent,
    SuccessSignupComponent,
    LoginSignupComponent,
    BackButtonComponent,
    SystemSignupComponent,
    NotificationsSignupComponent,
    EmailVerificationComponent,
    PhoneVerificationComponent,
    CreateCommitteeComponent,
    CreateConstituenciesComponent,
    CreateDepartmentComponent,
    CreateEmployeeComponent,
    CreateMcaComponent,
    CreateSubcountyComponent,
    CreateWardsComponent,
    ListCommitteeComponent,
    SearchBarComponent,
    ListItemComponent,
    ListMcaEmployeeComponent,
    ListPersonnelComponent,
    ListWardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
