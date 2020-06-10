import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage ,
    data: {
      title: 'Auth'
    },
    children: [
      {
        path: '',
        component: LoginPage ,
        data: {
          title: 'Signin'
        }
      },
      {
        path: 'register',
        component: RegisterPage ,
        data: {
          title: 'Sign Up'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
