import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { CountySignupComponent } from './views/signup/county/county.component';
import { AccountSignupComponent } from './views/signup/account/account.component';
import { EmailSignupComponent } from './views/signup/email/email.component';
import { SuccessSignupComponent } from './views/signup/success/success.component';
import { LoginSignupComponent } from './views/signup/login/login.component';
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
import { ListMcaEmployeeComponent } from './views/list/mca-employee/list-mca-employee.component';
import { ListPersonnelComponent } from './views/list/personnel/list-personnel.component';
import { ListWardsComponent } from './views/list/wards/list-wards.component';

const routes: Routes = [
  // Login route
  { path: 'login', component: LoginComponent },

  // Sign up parent route
  {
    path: 'signup',
    children: [
      { path: 'county', component: CountySignupComponent },
      { path: 'account', component: AccountSignupComponent },
      { path: 'email', component: EmailSignupComponent },
      { path: 'success', component: SuccessSignupComponent },
      { path: 'login', component: LoginSignupComponent },
      { path: 'system', component: SystemSignupComponent },
      { path: 'notifications', component: NotificationsSignupComponent },
      { path: 'email-verification', component: EmailVerificationComponent },
      { path: 'phone-verification', component: PhoneVerificationComponent },
    ],
  },

  //Create parent route
  {
    path: 'create',
    children: [
      { path: 'committee', component: CreateCommitteeComponent },
      { path: 'constituencies', component: CreateConstituenciesComponent },
      { path: 'department', component: CreateDepartmentComponent },
      { path: 'employee', component: CreateEmployeeComponent },
      { path: 'mca', component: CreateMcaComponent },
      { path: 'subcounty', component: CreateSubcountyComponent },
      { path: 'wards', component: CreateWardsComponent },
    ],
  },

  //List parent route
  {
    path: 'list',
    children: [
      { path: 'committee', component: ListCommitteeComponent },
      { path: 'mca-employee', component: ListMcaEmployeeComponent },
      { path: 'personnel', component: ListPersonnelComponent },
      { path: 'wards', component: ListWardsComponent },
    ],
  },

  // Fallback
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
