import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CognitoService} from '../_services/cognito.service';
import {CognitoUserResponse} from '../_models/cognito-user-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public cognitoService: CognitoService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['pain', Validators.required],
      password: ['123qweASD!!', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.cognitoService.signIn(this.f.username.value, this.f.password.value)
      .subscribe((user: CognitoUserResponse) => {
        switch (user.challengeName) {
          case 'NEW_PASSWORD_REQUIRED': {
            this.router.navigate(['password/change']);
            break;
          }
          case 'MFA_SETUP': {
            this.router.navigate(['mfa']);
            break;
          }
          case 'SMS_MFA': {
            this.router.navigate(['mfa']);
            break;
          }
          default: {
            localStorage.setItem('username', user.username);
            this.router.navigate(['home']);
          }
        }
        console.log(user);
      });
  }

  socialSignIn() {
  }

}
