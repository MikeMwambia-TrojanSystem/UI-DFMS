import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from 'src/app/shared/material.module';

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
import { CustomButtonComponent } from './components/CustomButton/custom-button.component';
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

import { AppComponent } from './app.component';
import { BackButtonComponent } from './components/BackButton/back-button.component';
import { ManagementItemComponent } from './components/ManagementItem/management-item.component';
import { BackgroundComponent } from './components/Background/background.component';
import { CenterCard } from './components/CenterCard/center-card.component';
import { InfoItemComponent } from './components/InfoItem/info-item.component';
import { MenuContainerComponent } from './components/MenuContainer/menu-container.component';
import { OriginatingPointComponent } from './components/OriginatingPoint/originating-point.component';
import { SearchBarComponent } from './components/SearchBar/search-bar.component';
import { ListItemComponent } from './components/ListItem/list-item.component';
import { OathContentComponent } from './components/OathContent/oath-content.component';
import { CommunicationItemComponent } from './components/CommunicationItem/communication-item.component';
import { OrderPaperItemComponent } from './components/OrderPaperItem/order-paper-item.component';
import { ReportItemComponent } from './components/ReportItem/report-item.component';
import { VerifyButtonComponent } from './components/VerifyButton/verify-button.component';
import { StatementItemComponent } from './components/StatementItem/statement-item.component';
import { ListDepartmentComponent } from './views/list/department/list-department.component';
import { ReportViewComponent } from './views/view/report/report-view.component';
import { EditMessageComponent } from './views/edit/message/edit-message.component';
import { MessagePreviewComponent } from './views/edit/message/preview/preview.component';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'files',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'file', keypath: 'file', options: { unique: false } },
        { name: 'uuid', keypath: 'uuid', options: { unique: true } },
      ],
    },
  ],
};

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
    AccountManagementComponent,
    ManagementItemComponent,
    AdministrationOathComponent,
    AddPetitionerComponent,
    UploadPageComponent,
    ActGenerateComponent,
    CustomButtonComponent,
    BackgroundComponent,
    CenterCard,
    BillGenerateComponent,
    MotionGenerateComponent,
    PetitionGenerateComponent,
    ListMotionComponent,
    InfoItemComponent,
    IntroComponent,
    ResetPasswordComponent,
    ReportGenerateComponent,
    OrderPaperGenerateComponent,
    ReportMethodsComponent,
    StatementUploadComponent,
    ReportUploadComponent,
    PaperContentGenerateComponent,
    MenuContainerComponent,
    VotebookGenerateComponent,
    OrderPaperViewComponent,
    EditTitleComponent,
    OriginatingPointComponent,
    EditPaperComponent,
    ListActComponent,
    ListBillComponent,
    ListPetitionComponent,
    ListReportComponent,
    ListOrderPaperComponent,
    ListVoteBookComponent,
    EditVotebookComponent,
    OathContentComponent,
    EditContentComponent,
    ContentPreviewComponent,
    VotebookPreviewComponent,
    PaperPreviewComponent,
    ListCommunicationComponent,
    CommunicationItemComponent,
    OrderPaperItemComponent,
    ReportItemComponent,
    VerifyButtonComponent,
    ListConstituencyComponent,
    ListMessageComponent,
    StatementItemComponent,
    ListStatementComponent,
    ListTentativeBusinesssComponent,
    ListSubcountyComponent,
    PublishStatusComponent,
    ListDepartmentComponent,
    ReportViewComponent,
    EditMessageComponent,
    MessagePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    CommonModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ size: ['small', 'normal', 'large'] }],
          // ['bold', 'italic'],
          // [{ indent: '-1' }, { indent: '+1' }],
          // ['underline'],
          // [{ header: 1 }, { header: 2 }],
          // ['blockquote'],
          // [{ list: 'ordered' }, { list: 'bullet' }],
          // ['link'],
        ],
      },
    }),
    HttpClientModule,
    PdfJsViewerModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
