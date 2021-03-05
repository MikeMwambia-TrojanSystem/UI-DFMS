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
import { EditPaperComponent } from './views/edit/paper/edit-paper.component';
import { ContentPreviewComponent } from './views/edit/content/preview/preview.component';
import { ListActComponent } from './views/list/act/list-act.component';
import { ListBillComponent } from './views/list/bill/list-bill.component';
import { ListPetitionComponent } from './views/list/petition/list-petition.component';
import { ListReportComponent } from './views/list/report/list-report.component';
import { ListOrderPaperComponent } from './views/list/order-paper/list-order-paper.component';
import { ListVoteBookComponent } from './views/list/votebook/votebook.component';
import { EditVotebookComponent } from './views/edit/votebook/edit-votebook.component';
import { EditContentComponent } from './views/edit/content/edit-content.component';
import { VotebookPreviewComponent } from './views/edit/votebook/preview/preview.component';
import { PaperPreviewComponent } from './views/edit/paper/preview/preview.component';
import { ListCommunicationComponent } from './views/list/communication/list-communication.component';
import { ListConstituencyComponent } from './views/list/constituency/list-constituency.component';
import { ListMessageComponent } from './views/list/message/list-message.component';
import { ListStatementComponent } from './views/list/statement/list-statement.component';
import { ListTentativeBusinesssComponent } from './views/list/tentative-business/list-tentative-business.component';
import { ListSubcountyComponent } from './views/list/subcounty/list-subcounty.component';
import { PublishStatusComponent } from './views/publish-status/publish-status.component';
import { ListDepartmentComponent } from './views/list/department/list-department.component';

import { MotionResolver } from './shared/resolver/motion/motion.resolver';
import { CanActivateMotion } from './shared/guard/motion/motion.guard';
import { ListMotionResolver } from './shared/resolver/motion/list-motion.resolver';
import { ListDepartmentResolver } from './shared/resolver/department/list-department.resolver';
import { ListSubCountyResolver } from './shared/resolver/ward-con-sub/list-subcounty.resolver';
import { ListWardResolver } from './shared/resolver/ward-con-sub/list-ward.resolver';
import { ListConstituencyResolver } from './shared/resolver/ward-con-sub/list-constituency.resolver';
import { ListCommitteeResolver } from './shared/resolver/committee/list-committee.resolver';
import { ListMcaEmployeeResolver } from './shared/resolver/mca-employee/list-mca-employee.resolver';
import { CanActivateCommittee } from './shared/guard/committee/committee.guard';
import { CommitteeResolver } from './shared/resolver/committee/committee.resolver';
import { CanActivateConstituency } from './shared/guard/constituency/constituency.guard';
import { ConstituencyResolver } from './shared/resolver/ward-con-sub/constituency.resolver';
import { CanActivateDepartment } from './shared/guard/department/department.guard';
import { DepartmentResolver } from './shared/resolver/department/department.resolver';
import { CanActivateSubcounty } from './shared/guard/subcounty/subcounty.guard';
import { CanActivateWard } from './shared/guard/ward/ward.guard';
import { WardResolver } from './shared/resolver/ward-con-sub/ward.resolver';
import { subcountyResolver } from './shared/resolver/ward-con-sub/subcounty.resolver';
import { McaResolver } from './shared/resolver/mca-employee/mca.resolver';
import { CanActivateMcaEmployee } from './shared/guard/mca-employee/mca-employee.guard';
import { ListStatementResolver } from './shared/resolver/statement/list-statement.resolver';
import { CanActivateStatement } from './shared/guard/statement/statement.guard';
import { StatementResolver } from './shared/resolver/statement/statement.resolver';
import { ListPetitionResolver } from './shared/resolver/petition/list-petition.resolver';
import { ListPetitionerResolver } from './shared/resolver/petitioner/list-petitioner.resolver';
import { PetitionResolver } from './shared/resolver/petition/petition.resolver';
import { CanActivatePetition } from './shared/guard/petition/petition.guard';
import { ListBillResolver } from './shared/resolver/bill/list-bill.resolver';
import { CanActivateBill } from './shared/guard/bill/bill.guard';
import { BillResolver } from './shared/resolver/bill/bill.resolver';
import { ListActResolver } from './shared/resolver/act/list-act.resolver';
import { CanActivateAct } from './shared/guard/act/act.guard';
import { ActResolver } from './shared/resolver/act/act.resolver';
import { PersonnelDepartmentsResolver } from './shared/resolver/personnel/departments.resolver';
import { PersonnelResolver } from './shared/resolver/personnel/personnel.resolver';
import { CanActivatePersonnel } from './shared/guard/personnel/personnel.guard';
import { ListPersonnelResolver } from './shared/resolver/personnel/list-personnels.resolver';

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
      {
        path: 'committee/:id',
        component: CreateCommitteeComponent,
        canActivate: [CanActivateCommittee],
        resolve: {
          committee: CommitteeResolver,
        },
      },
      {
        path: 'constituencies',
        component: CreateConstituenciesComponent,
      },
      {
        path: 'constituencies/:id',
        component: CreateConstituenciesComponent,
        canActivate: [CanActivateConstituency],
        resolve: {
          constituency: ConstituencyResolver,
        },
      },
      { path: 'department', component: CreateDepartmentComponent },
      {
        path: 'department/:id',
        component: CreateDepartmentComponent,
        canActivate: [CanActivateDepartment],
        resolve: {
          department: DepartmentResolver,
        },
      },
      {
        path: 'employee',
        component: CreateEmployeeComponent,
        resolve: {
          departments: PersonnelDepartmentsResolver,
        },
      },
      {
        path: 'employee/:id',
        component: CreateEmployeeComponent,
        canActivate: [CanActivatePersonnel],
        resolve: {
          departments: PersonnelDepartmentsResolver,
          personnel: PersonnelResolver,
        },
      },
      { path: 'mca', component: CreateMcaComponent },
      {
        path: 'mca/:id',
        component: CreateMcaComponent,
        canActivate: [CanActivateMcaEmployee],
        resolve: {
          mca: McaResolver,
        },
      },
      { path: 'subcounty', component: CreateSubcountyComponent },
      {
        path: 'subcounty/:id',
        component: CreateSubcountyComponent,
        canActivate: [CanActivateSubcounty],
        resolve: {
          subcounty: subcountyResolver,
        },
      },
      { path: 'wards', component: CreateWardsComponent },
      {
        path: 'wards/:id',
        component: CreateWardsComponent,
        canActivate: [CanActivateWard],
        resolve: {
          ward: WardResolver,
        },
      },
    ],
  },

  //List parent route
  {
    path: 'list',
    children: [
      {
        path: 'committee',
        component: ListCommitteeComponent,
        resolve: {
          committees: ListCommitteeResolver,
        },
      },
      {
        path: 'mca-employee',
        component: ListMcaEmployeeComponent,
        resolve: {
          mcaEmployees: ListMcaEmployeeResolver,
        },
      },
      {
        path: 'personnel',
        component: ListPersonnelComponent,
        resolve: {
          personnels: ListPersonnelResolver,
        },
      },
      {
        path: 'wards',
        component: ListWardsComponent,
        resolve: {
          wards: ListWardResolver,
        },
      },
      {
        path: 'motion',
        component: ListMotionComponent,
        resolve: {
          motions: ListMotionResolver,
        },
      },
      {
        path: 'act',
        component: ListActComponent,
        resolve: {
          acts: ListActResolver,
        },
      },
      {
        path: 'bill',
        component: ListBillComponent,
        resolve: {
          bills: ListBillResolver,
        },
      },
      {
        path: 'petition',
        component: ListPetitionComponent,
        resolve: {
          petitions: ListPetitionResolver,
        },
      },
      { path: 'report', component: ListReportComponent },
      { path: 'order-paper', component: ListOrderPaperComponent },
      { path: 'votebook', component: ListVoteBookComponent },
      { path: 'communication', component: ListCommunicationComponent },
      {
        path: 'constituency',
        component: ListConstituencyComponent,
        resolve: {
          constituencies: ListConstituencyResolver,
        },
      },
      { path: 'message', component: ListMessageComponent },
      {
        path: 'statement',
        component: ListStatementComponent,
        resolve: {
          statements: ListStatementResolver,
        },
      },
      {
        path: 'tentative-business',
        component: ListTentativeBusinesssComponent,
      },
      {
        path: 'subcounty',
        component: ListSubcountyComponent,
        resolve: {
          subCounties: ListSubCountyResolver,
        },
      },
      {
        path: 'department',
        component: ListDepartmentComponent,
        resolve: {
          departments: ListDepartmentResolver,
        },
      },
    ],
  },

  //Management parent route
  {
    path: 'management',
    children: [
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'oath', component: AdministrationOathComponent },
      {
        path: 'petitioners',
        component: AddPetitionerComponent,
        resolve: {
          petitioners: ListPetitionerResolver,
        },
      },

      { path: 'upload', component: UploadPageComponent },
    ],
  },

  //Generate parent route
  {
    path: 'generate',
    children: [
      {
        path: 'act',
        component: ActGenerateComponent,
      },
      {
        path: 'act/:id',
        component: ActGenerateComponent,
        canActivate: [CanActivateAct],
        resolve: {
          act: ActResolver,
        },
      },
      { path: 'bill', component: BillGenerateComponent },
      {
        path: 'bill/:id',
        component: BillGenerateComponent,
        canActivate: [CanActivateBill],
        resolve: {
          bill: BillResolver,
        },
      },
      {
        path: 'motion',
        component: MotionGenerateComponent,
      },
      {
        path: 'motion/:id',
        component: MotionGenerateComponent,
        canActivate: [CanActivateMotion],
        resolve: {
          motion: MotionResolver,
        },
      },
      { path: 'petition', component: PetitionGenerateComponent },
      {
        path: 'petition/:id',
        component: PetitionGenerateComponent,
        resolve: {
          petition: PetitionResolver,
        },
        canActivate: [CanActivatePetition],
      },
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

  //Edit parent route
  {
    path: 'edit',
    children: [
      {
        path: 'votebook/:id',
        component: EditVotebookComponent,
      },
      {
        path: 'votebook/:id/preview',
        component: VotebookPreviewComponent,
      },
      { path: 'paper/:id', component: EditPaperComponent },
      {
        path: 'paper/:id/preview',
        component: PaperPreviewComponent,
      },
      { path: 'content/:id', component: EditContentComponent },
      {
        path: 'content/:id/preview',
        component: ContentPreviewComponent,
      },
    ],
  },

  //Upload parent route
  {
    path: 'upload',
    children: [
      { path: 'statement', component: StatementUploadComponent },
      {
        path: 'statement/:id',
        component: StatementUploadComponent,
        canActivate: [CanActivateStatement],
        resolve: { statement: StatementResolver },
      },
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

  //Publish Status
  {
    path: 'publish-status',
    component: PublishStatusComponent,
  },
  {
    path: 'publish-status/:id',
    component: PublishStatusComponent,
  },

  // Fallback
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
