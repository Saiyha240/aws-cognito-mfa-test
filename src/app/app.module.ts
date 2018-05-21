import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import Amplify from 'aws-amplify';
import {LoginComponent} from './login/login.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ReactiveFormsModule} from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmMfaComponent } from './confirm-mfa/confirm-mfa.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {environment} from '../environments/environment';
import { HomeComponent } from './home/home.component';

Amplify.configure({
  Auth: {
    identityPoolId: environment.aws.cognito.identityPoolId,
    region: environment.aws.region,
    userPoolId: environment.aws.cognito.userPoolId,
    userPoolWebClientId: environment.aws.cognito.userPoolWebClientId
  }
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    ConfirmMfaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
