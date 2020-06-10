import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPage } from './register/register.page';
import { AuthPage } from './auth.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthRoutingModule,
    TabsModule.forRoot()
  ],
  declarations: [
    LoginPage,
    RegisterPage,
    AuthPage
  ]
})
export class AuthModule {}
