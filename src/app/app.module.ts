import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import Amplify from 'aws-amplify';
import {LoginComponent} from './login/login.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ConfirmMfaComponent} from './confirm-mfa/confirm-mfa.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {environment} from '../environments/environment';
import {HomeComponent} from './home/home.component';
import {ErrorsHandlerService} from './_services/errors-handler.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import * as moment from 'moment';

Amplify.configure({
  Auth: {
    identityPoolId: environment.aws.cognito.identityPoolId,
    region: environment.aws.region,
    userPoolId: environment.aws.cognito.userPoolId,
    userPoolWebClientId: environment.aws.cognito.userPoolWebClientId,
    cookieStorage: {
      domain: 'de5lhf84q10m6.cloudfront.net',
      expires: moment('2038-01-01T00:00:00').diff(moment(), 'days'),
      secure: true
    }
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
