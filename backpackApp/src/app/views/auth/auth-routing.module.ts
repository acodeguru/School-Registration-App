import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login';
import { SignupPage } from './signup/signup';

const routes: Routes = [
  {
    path: '',
    component: LoginPage ,
    data: {
      title: 'Sign In'
    }
  },
  {
    path: 'signup',
    component: SignupPage ,
    data: {
      title: 'Sign Up'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
