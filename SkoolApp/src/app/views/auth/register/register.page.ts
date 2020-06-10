import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { Roles } from '../../../_core/helpers/roles.enum';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MustMatch } from 'src/app/_core/helpers/must-match.validator';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  userModel = new User(null, null, null, null, 0, Roles.User);
  registerForm: FormGroup;
  submitted = false;

  async onSubmit() {
    await this.presentLoading()
    if (this.registerForm.valid) {
      this.userModel.role = "User";
      this.userModel.status = 1;

      // calling the register service
      this.authService.register(this.userModel).subscribe(({ data }) => {
        if (data) {
          this.router.navigate(['']);
          this.showAlerts("Good Job","you are now connected with us", "success");
        }
      }, (error) => {
        if (error) {
          this.showAlerts("Error",error.networkError.error.errors[0].message, "danger");
        }
      });
    } else {
      this.getFormValidationErrors();
    }

  }

  async getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.showAlerts("Error","invalid submittion, please check the form validation", "danger");
        });
      }
    });
  }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  async showAlerts(toast_header:string, toast_message: string, toast_color: string) {
    this.loadingController.dismiss();
    const toast = await this.toastController.create({
      header: toast_header,
      message: toast_message,
      position: 'bottom',
      color: toast_color,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  }

}


