import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';

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

import { AppComponent } from './app.component';
import { BackButtonComponent } from './components/BackButton/back-button.component';
import { ManagementItemComponent } from './components/ManagementItem/management-item.component';
import { BackgroundComponent } from './components/Background/background.component';
import { CenterCard } from './components/CenterCard/center-card.component';
import { MotionItemComponent } from './components/MotionItem/motion-item.component';
import { MenuContainerComponent } from './components/MenuContainer/menu-container.component';
import { OriginatingPointComponent } from './components/OriginatingPoint/originating-point.component';
import { SearchBarComponent } from './components/SearchBar/search-bar.component';
import { ListItemComponent } from './components/ListItem/list-item.component';
import { EditPaperComponent } from './views/edit/edit-paper.component';

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
    MotionItemComponent,
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
          ['bold', 'italic'],
          [{ indent: '-1' }, { indent: '+1' }],
          ['underline'],
          [{ header: 1 }, { header: 2 }],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
        ],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
