import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../_services/cognito.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public cognitoService: CognitoService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      new_password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.cognitoService.completeNewPassword(this.f.new_password.value)
      .subscribe(user => {
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
            break;
          }
        }
        console.log(user);
      });
  }

}
