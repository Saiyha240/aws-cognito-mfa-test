import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {CognitoUserResponse} from '../_models/cognito-user-response';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  username: string;
  user: CognitoUser;

  constructor() {
  }

  signIn(username: string, password: string): Observable<CognitoUserResponse> {
    this.username = username;

    return fromPromise(Auth.signIn(username, password))
      .pipe(
        tap(user => {
          console.log(user);
          this.user = user;
        })
      );
  }

  completeNewPassword(password: string) {
    return fromPromise(Auth.completeNewPassword(this.user, password, []));
  }

  confirmSignIn(mfaCode, mfaType = 'SMS') {
    return fromPromise(Auth.confirmSignIn(this.user, mfaCode, null));
  }

  sendMFACode() {
    return fromPromise(Auth.setPreferredMFA(this.user, 'SMS'));
  }

  getCurrentSession() {
    return fromPromise(Auth.currentSession());
  }
}
