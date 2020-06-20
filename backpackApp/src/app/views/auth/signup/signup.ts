import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from '@interfaces/user-options';
import { MustMatch } from 'src/app/_core/helpers/must-match.validator';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage  implements OnInit{
  signup: UserOptions = { email: '', password: '', firstName:'', lastName:'' };
  submitted = false;
  registerForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private authService: AuthService
  ) {}
  

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }


  async onSignup() {
    await this.presentLoading()
    if (this.registerForm.valid) {
      this.submitted = true;

      // calling the register service
      this.authService.signup(this.signup).subscribe(({ data }) => {
        if (data) {
          this.router.navigate(['']);
          this.showAlerts("Good Job","you are now connected with us", "success");
          this.router.navigate(['']);
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

  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.showAlerts("Error","invalid submittion, please check the form validation", "danger");
        });
      }
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
