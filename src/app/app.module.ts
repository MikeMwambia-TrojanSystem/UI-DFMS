import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/shared/material.module';

import { LoginComponent } from './views/login/login.component';
import { CountySignupComponent } from './views/signup/county/county.component';
import { AccountSignupComponent } from './views/signup/account/account.component';
import { EmailSignupComponent } from './views/signup/email/email.component';
import { SuccessSignupComponent } from './views/signup/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CountySignupComponent,
    AccountSignupComponent,
    EmailSignupComponent,
    SuccessSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
