import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';

import { AuthService } from '@services/auth.service';
import { ILoginResult } from '@customTypes/login-result.type';
import { User } from '@models/user.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, public toastController: ToastController) { }

  // initializing the user model
  userModel = new User(null, null, null, null, null, null);
  loginForm: FormGroup;
  submitted = false;

  // on form submit
  async onSubmit() {
    // check validate 
    if (this.loginForm.valid) {
      this.authService.login(this.userModel).subscribe((result: ApolloQueryResult<ILoginResult>) => {
        if (result.data?.login && result.data?.login.token) {
          this.authService.storeToken(result.data);
        }
      }, (error) => {
        if (error) {
          this.showAlerts("Error", error.networkError.error.errors[0].message, "danger");
        }
      });
    } else {
      this.getFormValidationErrors();
    }

  }

  // form validations
  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.showAlerts("Error", "invalid submittion, please check the form validation", "danger");
        });
      }
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  async showAlerts(toast_header: string, toast_message: string, toast_color: string) {
    const toast = await this.toastController.create({
      header: toast_header,
      message: toast_message,
      position: 'bottom',
      color: toast_color,
      duration: 2000
    });
    toast.present();

    setTimeout(() => {
      toast.dismiss();
    }, 2500);

  }


}
