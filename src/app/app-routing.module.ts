import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ConfirmMfaComponent} from './confirm-mfa/confirm-mfa.component';
import {LoginGuard} from './_guards/login.guard';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {
    path: 'password', canActivate: [LoginGuard], children: [
      {path: 'change', component: ChangePasswordComponent}
    ]
  },
  {
    path: 'mfa', canActivate: [LoginGuard], children: [
      {path: '', component: ConfirmMfaComponent}
    ]
  },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
