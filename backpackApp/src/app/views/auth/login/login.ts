import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from '@interfaces/user-options';
import { AuthService } from '@services/auth.service';
import { ApolloQueryResult } from 'apollo-client';
import { ToastController } from '@ionic/angular';
import { ILoginResult } from 'src/app/_core/interfaces/login-result.type';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage implements OnInit {
  login: UserOptions = { email: '', password: '' };
  loginForm: FormGroup;
  submitted = false;

  constructor(
    public router: Router,
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    public toastController: ToastController
  ) {

   }

   onSignup() {
    this.router.navigateByUrl('signup');
  }

  // on form submit
  onLogin() {
    // check validate 
    if (this.loginForm.valid) {
      this.authService.login(this.login).subscribe((result: ApolloQueryResult<ILoginResult>) => {

        console.log(result)
        if (result.data?.login && result.data?.login.token) {
          this.authService.login_auth(result.data.login.token);
          this.router.navigate(['backpack']);
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
    if(this.authService.isLoggedIn()){
      this.router.navigate(['school']);
    }

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    
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
