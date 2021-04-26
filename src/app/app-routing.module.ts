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
import { EmailVerificationComponent } from './views/verification/email-verification/email-verification.component';
import { PhoneVerificationComponent } from './views/verification/phone-verification/phone-verification.component';
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
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { ReportGenerateComponent } from './views/generate/report/report-generate.component';
import { OrderPaperGenerateComponent } from './views/generate/order-paper/order-paper-generate.component';
import { ReportMethodsComponent } from './views/report-methods/report-methods.component';
import { StatementUploadComponent } from './views/upload/statement/statement-upload.component';
import { ReportUploadComponent } from './views/upload/report/report-upload.component';
import { PaperContentGenerateComponent } from './views/generate/paper-content/paper-content-generate.component';
import { VotebookGenerateComponent } from './views/generate/votebook/votebook-generate.component';
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
import { ReportViewComponent } from './views/view/report/report-view.component';
import { UpdatePasswordComponent } from './views/reset-password/update-password/update-password.component';
import { CommitteeViewComponent } from './views/view/committee/committee-view.component';
import { EditNoticeMotionComponent } from './views/edit/notice-motion/edit-notice-motion.component';
import { VotebookNoticeMotionPreviewComponent } from './views/edit/notice-motion/preview/preview.component';
import { EditBillComponent } from './views/edit/bill/edit-bill.component';
import { VotebookBillPreviewComponent } from './views/edit/bill/preview/preview.component';
import { EditMotionComponent } from './views/edit/motion/edit-motion.component';
import { VotebookMotionPreviewComponent } from './views/edit/motion/preview/preview.component';
import { EditMessageComponent } from './views/edit/message/edit-message.component';
import { MessagePreviewComponent } from './views/edit/message/preview/preview.component';
import { ConstituencyViewComponent } from './views/view/constituency/constituency-view.component';

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
import { PetitionResolver } from './shared/resolver/petition/petition.resolver';
import { CanActivatePetition } from './shared/guard/petition/petition.guard';
import { ListBillResolver } from './shared/resolver/bill/list-bill.resolver';
import { CanActivateBill } from './shared/guard/bill/bill.guard';
import { BillResolver } from './shared/resolver/bill/bill.resolver';
import { ListActResolver } from './shared/resolver/act/list-act.resolver';
import { CanActivateAct } from './shared/guard/act/act.guard';
import { ActResolver } from './shared/resolver/act/act.resolver';
import { PersonnelResolver } from './shared/resolver/personnel/personnel.resolver';
import { CanActivatePersonnel } from './shared/guard/personnel/personnel.guard';
import { ListPersonnelResolver } from './shared/resolver/personnel/list-personnels.resolver';
import { ListReportResolver } from './shared/resolver/report/list-report.resolver';
import { CanActivateUploadReport } from './shared/guard/report/upload-report.guard';
import { ReportResolver } from './shared/resolver/report/report.resolver';
import { CanActivateOrderPaper } from './shared/guard/order-paper/order-paper.guard';
import { OrderPaperResolver } from './shared/resolver/order-paper/order-paper.resolver';
import { ListOrderPaperResolver } from './shared/resolver/order-paper/list-order-paper.resolver';
import { CanActivateVotebook } from './shared/guard/votebook/votebook.guard';
import { VotebookResolver } from './shared/resolver/votebook/votebook.resolver';
import { ListVotebookResolver } from './shared/resolver/votebook/list-votebook.resolver';
import { CanActivateViewCommittee } from './shared/guard/committee/view-committee.guard';
import { CanActivateViewConstituency } from './shared/guard/constituency/view-constituency.guard';
import { DepartmentViewComponent } from './views/view/department/department-view.component';
import { CanActivateViewDepartment } from './shared/guard/department/view-department.guard';
import { EmployeeViewComponent } from './views/view/employee/employee-view.component';
import { CanActivateViewPersonnel } from './shared/guard/personnel/view-personnel.guard';
import { McaViewComponent } from './views/view/mca/mca-view.component';
import { CanActivateViewMcaEmployee } from './shared/guard/mca-employee/view-mca-employee.guard';
import { SubcountyViewComponent } from './views/view/subcounty/subcounty-view.component';
import { CanActivateViewSubcounty } from './shared/guard/subcounty/view-subcounty.guard';
import { WardViewComponent } from './views/view/ward/ward-view.component';
import { CanActivateViewWard } from './shared/guard/ward/view-ward.guard';
import { ActViewComponent } from './views/view/act/act-view.component';
import { CanActivateViewAct } from './shared/guard/act/view-act.guard';
import { BillViewComponent } from './views/view/bill/bill-view.component';
import { CanActivateViewBill } from './shared/guard/bill/view-bill.guard';
import { ReportDocumentViewComponent } from './views/view/report-document/report-document-view.component';
import { CanActivateViewUploadReport } from './shared/guard/report/view-report.guard';
import { MotionViewComponent } from './views/view/motion/motion-view.component';
import { CanActivateViewMotion } from './shared/guard/motion/view-motion.guard';
import { PetitionViewComponent } from './views/view/petition/petition-view.component';
import { CanActivateViewPetition } from './shared/guard/petition/view-petition.guard';
import { OrderPaperDocumentViewComponent } from './views/view/order-paper-document/order-paper-document-view.component';
import { CanActivateViewOrderPaper } from './shared/guard/order-paper/view-order-paper.guard';
import { PaperContentViewComponent } from './views/view/paper-content/paper-content-view.component';
import { VotebookContentGenerateComponent } from './views/generate/votebook-content/votebook-content-generate.component';
import { SpeakerResolver } from './shared/resolver/speaker/speaker.resolver';
import { VotebookOrderPaperResolver } from './shared/resolver/votebook/order-paper.resolver';
import { CanActivateAuth } from './shared/guard/auth/auth.guard';
import { ListNoticeOfMotionComponent } from './views/list/notice-of-motion/list-notice.component';
import { ListNoticeOfMotionResolver } from './shared/resolver/notice-of-motion/list-notice.resolver';
import { CanActivateUnAuth } from './shared/guard/auth/unauth.guard';
import { PersonnelVerificationComponent } from './views/verification/personnel/personnel-verification.component';
import { McaVerificationComponent } from './views/verification/mca/mca-verification.component';
import { PersonnelDepartmentResolver } from './shared/resolver/personnel/department.resolver';
import { AllDepartmentResolver } from './shared/resolver/department/all-department.resolver';
import { TentativeBusinessGenerateComponent } from './views/generate/tentative-business/tentative-biz-generate.component';
import { TentativeBusinessContentGenerateComponent } from './views/generate/tentative-business-content/tb-content-generate.component';
import { CanActivateTentativeBusiness } from './shared/guard/tentative-business/tentative-business.guard';
import { TentativeBusinessResolver } from './shared/resolver/tentative-business/tentative-business.resolver';
import { ListTentativeBusinessResolver } from './shared/resolver/tentative-business/list-tentative-business.resolver';
import { CanActivateTentativeBusinessOrderPaper } from './shared/guard/tentative-business/order-paper.guard';
import { TentativeBusinessOrderPaperResolver } from './shared/resolver/tentative-business/order-paper.resolver';
import { StatementViewComponent } from './views/view/statement/statement-view.component';
import { VotebookViewComponent } from './views/view/votebook/votebook-view.component';
import { VotebookContentViewComponent } from './views/view/votebook-content/votebook-content-view.component';
import { TentativeBusinessOrderPaperEditResolver } from './shared/resolver/tentative-business/edit-order-paper.resolver';
import { TentativeBusinessViewComponent } from './views/view/tentative-business/tentative-biz-view.component';
import { TentativeBusinessContentViewComponent } from './views/view/tentative-business-content/tb-content-view.component';
import { NoticeGenerateComponent } from './views/generate/notice-of-motion/notice-generate.component';

const routes: Routes = [
  // Login route
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateUnAuth],
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'update-password', component: UpdatePasswordComponent },

  // Verification parent routte
  {
    path: 'verification',
    children: [
      { path: 'phone', component: PhoneVerificationComponent },
      { path: 'email', component: EmailVerificationComponent },
      { path: 'mca', component: McaVerificationComponent },
      { path: 'personnel', component: PersonnelVerificationComponent },
    ],
  },

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
    ],
  },

  //Create parent route
  {
    path: 'create',
    canActivate: [CanActivateAuth],
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
      },
      {
        path: 'employee/:id',
        component: CreateEmployeeComponent,
        canActivate: [CanActivatePersonnel],
        resolve: {
          personnel: PersonnelResolver,
          departments: PersonnelDepartmentResolver,
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
    canActivate: [CanActivateAuth],
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
        path: 'notice-of-motion',
        component: ListNoticeOfMotionComponent,
        resolve: {
          notices: ListNoticeOfMotionResolver,
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
      {
        path: 'report',
        component: ListReportComponent,
        resolve: {
          reports: ListReportResolver,
        },
      },
      {
        path: 'order-paper',
        component: ListOrderPaperComponent,
        resolve: {
          orderPapers: ListOrderPaperResolver,
        },
      },
      {
        path: 'votebook',
        component: ListVoteBookComponent,
        resolve: {
          votebooks: ListVotebookResolver,
        },
      },
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
        resolve: {
          tentativeBusinesses: ListTentativeBusinessResolver,
        },
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
    canActivate: [CanActivateAuth],
    children: [
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'oath', component: AdministrationOathComponent },
      {
        path: 'petitioners',
        component: AddPetitionerComponent,
      },

      { path: 'upload', component: UploadPageComponent },
    ],
  },

  //Generate parent route
  {
    path: 'generate',
    canActivate: [CanActivateAuth],
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
          departments: AllDepartmentResolver,
        },
      },
      {
        path: 'notice-of-motion',
        component: NoticeGenerateComponent,
      },
      {
        path: 'notice-of-motion/:id',
        component: NoticeGenerateComponent,
        canActivate: [CanActivateMotion],
        resolve: {
          motion: MotionResolver,
          departments: AllDepartmentResolver,
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
      {
        path: 'order-paper/:id',
        component: OrderPaperGenerateComponent,
        canActivate: [CanActivateOrderPaper],
        resolve: {
          orderPaper: OrderPaperResolver,
        },
      },
      { path: 'paper-content', component: PaperContentGenerateComponent },
      {
        path: 'paper-content/:id',
        component: PaperContentGenerateComponent,
        resolve: { orderPaper: OrderPaperResolver },
        canActivate: [CanActivateOrderPaper],
      },
      {
        path: 'votebook',
        component: VotebookGenerateComponent,
        resolve: { speaker: SpeakerResolver },
      },
      {
        path: 'votebook/:votebookId',
        component: VotebookGenerateComponent,
        canActivate: [CanActivateVotebook],
        resolve: {
          votebook: VotebookResolver,
          speaker: SpeakerResolver,
          orderPaper: VotebookOrderPaperResolver,
        },
      },
      {
        path: 'votebook-content',
        component: VotebookContentGenerateComponent,
      },
      {
        path: 'votebook-content/:votebookId',
        component: VotebookContentGenerateComponent,
        canActivate: [CanActivateVotebook],
        resolve: {
          votebook: VotebookResolver,
        },
      },
      {
        path: 'tentative-business',
        component: TentativeBusinessGenerateComponent,
        canActivate: [CanActivateTentativeBusinessOrderPaper],
        resolve: {
          orderPaper: TentativeBusinessOrderPaperResolver,
        },
      },
      {
        path: 'tentative-business-content',
        component: TentativeBusinessContentGenerateComponent,
        canActivate: [CanActivateTentativeBusinessOrderPaper],
        resolve: {
          orderPaper: TentativeBusinessOrderPaperResolver,
        },
      },
      {
        path: 'tentative-business/:id',
        component: TentativeBusinessGenerateComponent,
        canActivate: [CanActivateTentativeBusiness],
        resolve: {
          tentativeBusiness: TentativeBusinessResolver,
          orderPaper: TentativeBusinessOrderPaperEditResolver,
        },
      },
      {
        path: 'tentative-business-content/:id',
        component: TentativeBusinessContentGenerateComponent,
        canActivate: [CanActivateTentativeBusiness],
        resolve: {
          tentativeBusiness: TentativeBusinessResolver,
          orderPaper: TentativeBusinessOrderPaperEditResolver,
        },
      },
    ],
  },

  //View parent route
  {
    path: 'view',
    canActivate: [CanActivateAuth],
    children: [
      // { path: 'order-paper', component: OrderPaperViewComponent },
      // { path: 'order-paper/edit-title', component: EditTitleComponent },
      { path: 'report', component: ReportViewComponent },
      {
        path: 'committee/:id',
        component: CommitteeViewComponent,
        canActivate: [CanActivateViewCommittee],
        resolve: {
          committee: CommitteeResolver,
        },
      },
      {
        path: 'constituency/:id',
        component: ConstituencyViewComponent,
        canActivate: [CanActivateViewConstituency],
        resolve: {
          constituency: ConstituencyResolver,
        },
      },
      {
        path: 'department/:id',
        component: DepartmentViewComponent,
        canActivate: [CanActivateViewDepartment],
        resolve: {
          department: DepartmentResolver,
        },
      },
      {
        path: 'employee/:id',
        component: EmployeeViewComponent,
        canActivate: [CanActivateViewPersonnel],
        resolve: {
          personnel: PersonnelResolver,
          departments: PersonnelDepartmentResolver,
        },
      },
      {
        path: 'mca/:id',
        component: McaViewComponent,
        canActivate: [CanActivateViewMcaEmployee],
        resolve: {
          mca: McaResolver,
        },
      },
      {
        path: 'subcounty/:id',
        component: SubcountyViewComponent,
        canActivate: [CanActivateViewSubcounty],
        resolve: {
          subcounty: subcountyResolver,
        },
      },
      {
        path: 'ward/:id',
        component: WardViewComponent,
        canActivate: [CanActivateViewWard],
        resolve: {
          ward: WardResolver,
        },
      },
      {
        path: 'act/:id',
        component: ActViewComponent,
        canActivate: [CanActivateViewAct],
        resolve: {
          act: ActResolver,
        },
      },
      {
        path: 'bill/:id',
        component: BillViewComponent,
        canActivate: [CanActivateViewBill],
        resolve: {
          bill: BillResolver,
        },
      },
      {
        path: 'report/:id',
        component: ReportDocumentViewComponent,
        canActivate: [CanActivateViewUploadReport],
        resolve: {
          report: ReportResolver,
        },
      },
      {
        path: 'motion/:id',
        component: MotionViewComponent,
        canActivate: [CanActivateViewMotion],
        resolve: {
          motion: MotionResolver,
        },
      },
      {
        path: 'petition/:id',
        component: PetitionViewComponent,
        resolve: {
          petition: PetitionResolver,
        },
        canActivate: [CanActivateViewPetition],
      },
      {
        path: 'statement/:id',
        component: StatementViewComponent,
        resolve: {
          statement: StatementResolver,
        },
        canActivate: [CanActivateStatement],
      },
      {
        path: 'order-paper/:id',
        component: OrderPaperDocumentViewComponent,
        canActivate: [CanActivateViewOrderPaper],
        resolve: {
          orderPaper: OrderPaperResolver,
        },
      },
      {
        path: 'paper-content/:id',
        component: PaperContentViewComponent,
        canActivate: [CanActivateViewOrderPaper],
        resolve: {
          orderPaper: OrderPaperResolver,
        },
      },
      {
        path: 'votebook/:votebookId',
        component: VotebookViewComponent,
        canActivate: [CanActivateVotebook],
        resolve: {
          votebook: VotebookResolver,
          orderPaper: VotebookOrderPaperResolver,
        },
      },
      {
        path: 'votebook-content/:votebookId',
        component: VotebookContentViewComponent,
        canActivate: [CanActivateVotebook],
        resolve: {
          votebook: VotebookResolver,
        },
      },
      {
        path: 'tentative-business/:id',
        component: TentativeBusinessViewComponent,
        canActivate: [CanActivateTentativeBusiness],
        resolve: {
          tentativeBusiness: TentativeBusinessResolver,
          orderPaper: TentativeBusinessOrderPaperEditResolver,
        },
      },
      {
        path: 'tentative-business-content/:id',
        component: TentativeBusinessContentViewComponent,
        canActivate: [CanActivateTentativeBusiness],
        resolve: {
          tentativeBusiness: TentativeBusinessResolver,
          orderPaper: TentativeBusinessOrderPaperEditResolver,
        },
      },
    ],
  },

  //Edit parent route
  {
    path: 'edit',
    canActivate: [CanActivateAuth],
    children: [
      {
        path: 'votebook',
        component: EditVotebookComponent,
      },
      {
        path: 'votebook/preview',
        component: VotebookPreviewComponent,
      },
      { path: 'paper', component: EditPaperComponent },
      {
        path: 'paper/preview',
        component: PaperPreviewComponent,
      },
      { path: 'content', component: EditContentComponent },
      {
        path: 'content/preview',
        component: ContentPreviewComponent,
      },
      {
        path: 'message',
        component: EditMessageComponent,
      },
      {
        path: 'message/preview',
        component: MessagePreviewComponent,
      },
      {
        path: 'notice-motion',
        component: EditNoticeMotionComponent,
      },
      {
        path: 'notice-motion/preview',
        component: VotebookNoticeMotionPreviewComponent,
      },
      {
        path: 'motion',
        component: EditMotionComponent,
      },
      {
        path: 'motion/preview',
        component: VotebookMotionPreviewComponent,
      },
      {
        path: 'bill',
        component: EditBillComponent,
      },
      {
        path: 'bill/preview',
        component: VotebookBillPreviewComponent,
      },
    ],
  },

  //Upload parent route
  {
    path: 'upload',
    canActivate: [CanActivateAuth],
    children: [
      { path: 'statement', component: StatementUploadComponent },
      {
        path: 'statement/:id',
        component: StatementUploadComponent,
        canActivate: [CanActivateStatement],
        resolve: { statement: StatementResolver },
      },
      { path: 'report', component: ReportUploadComponent },
      {
        path: 'report/:id',
        component: ReportUploadComponent,
        canActivate: [CanActivateUploadReport],
        resolve: {
          report: ReportResolver,
        },
      },
    ],
  },

  //Report Methods
  {
    path: 'report-methods',
    component: ReportMethodsComponent,
    canActivate: [CanActivateAuth],
  },

  //Intro
  {
    path: 'intro',
    component: IntroComponent,
    canActivate: [CanActivateAuth],
  },

  //Publish Status
  {
    path: 'publish-status',
    component: PublishStatusComponent,
    canActivate: [CanActivateAuth],
  },
  {
    path: 'publish-status/:id',
    component: PublishStatusComponent,
    canActivate: [CanActivateAuth],
  },

  // Fallback
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
