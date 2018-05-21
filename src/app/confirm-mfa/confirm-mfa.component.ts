import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CognitoService} from '../_services/cognito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AwsError} from '../_models/aws-error';

@Component({
  selector: 'app-confirm-mfa',
  templateUrl: './confirm-mfa.component.html',
  styleUrls: ['./confirm-mfa.component.scss']
})
export class ConfirmMfaComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  user: any;
  error: AwsError;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public cognitoService: CognitoService) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mfaCode: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.user = this.cognitoService.user;

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.cognitoService.confirmSignIn(this.f.mfaCode.value)
      .subscribe(user => {
        switch (user.challengeName) {
          case 'NEW_PASSWORD_REQUIRED': {
            this.router.navigate(['password/change']);
            break;
          }
          case 'SMS_MFA': {
            localStorage.setItem('username', user.username);
            this.router.navigate(['home']);
            break;
          }
          default: {
            localStorage.setItem('username', user.username);
            this.router.navigate(['home']);
          }
        }
        console.log(user);
      }, (error: AwsError) => {
        this.error = error;
      });
  }

}
