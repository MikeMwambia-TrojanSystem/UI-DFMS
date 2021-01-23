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
import { AccountManagementComponent } from './views/management/account/account-management.component';
import { AdministrationOathComponent } from './views/management/ad-oath/ad-oath.component';
import { AddPetitionerComponent } from './views/management/petitioner/add-petitioner.component';
import { UploadPageComponent } from './views/management/upload/upload-page.component';
import { ActGenerateComponent } from './views/generate/act/act-generate.component';
import { BillGenerateComponent } from './views/generate/bill/bill-generate.component';
import { MotionGenerateComponent } from './views/generate/motion/motion-generate.component';
import { PetitionGenerateComponent } from './views/generate/petition/petition-generate.component';
import { ListMotionComponent } from './views/list/motion/list-motion.component';
import { IntroComponent } from './views/intro/intro.component';
import { ResetPasswordComponent } from './views/signup/reset-password/reset-password.component';
import { ReportGenerateComponent } from './views/generate/report/report-generate.component';
import { OrderPaperGenerateComponent } from './views/generate/order-paper/order-paper-generate.component';
import { ReportMethodsComponent } from './views/report-methods/report-methods.component';
import { StatementUploadComponent } from './views/upload/statement/statement-upload.component';
import { ReportUploadComponent } from './views/upload/report/report-upload.component';
import { PaperContentGenerateComponent } from './views/generate/paper-content/paper-content-generate.component';
import { VotebookGenerateComponent } from './views/generate/votebook/votebook-generate.component';
import { OrderPaperViewComponent } from './views/view/order-paper/order-paper-view.component';
import { EditTitleComponent } from './views/view/order-paper/edit-title/edit-title.component';

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
      { path: 'reset-password', component: ResetPasswordComponent },
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
      { path: 'motion', component: ListMotionComponent },
    ],
  },

  //Management parent route
  {
    path: 'management',
    children: [
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'oath', component: AdministrationOathComponent },
      { path: 'petitioners', component: AddPetitionerComponent },
      { path: 'upload', component: UploadPageComponent },
    ],
  },

  //Generate parent route
  {
    path: 'generate',
    children: [
      { path: 'act', component: ActGenerateComponent },
      { path: 'bill', component: BillGenerateComponent },
      { path: 'motion', component: MotionGenerateComponent },
      { path: 'petition', component: PetitionGenerateComponent },
      { path: 'report', component: ReportGenerateComponent },
      { path: 'order-paper', component: OrderPaperGenerateComponent },
      { path: 'paper-content', component: PaperContentGenerateComponent },
      { path: 'votebook', component: VotebookGenerateComponent },
    ],
  },

  //View parent route
  {
    path: 'view',
    children: [
      { path: 'order-paper/:id', component: OrderPaperViewComponent },
      { path: 'order-paper/:id/edit-title', component: EditTitleComponent },
    ],
  },

  //Upload parent route
  {
    path: 'upload',
    children: [
      { path: 'statement', component: StatementUploadComponent },
      { path: 'report', component: ReportUploadComponent },
    ],
  },

  //Report Methods
  { path: 'report-methods', component: ReportMethodsComponent },

  //Intro
  {
    path: 'intro',
    component: IntroComponent,
  },

  // Fallback
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
