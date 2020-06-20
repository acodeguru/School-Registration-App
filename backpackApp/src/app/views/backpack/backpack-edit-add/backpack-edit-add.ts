import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { BackbackService } from '@services/backpack.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BackpackOptions } from '@interfaces/backpack-options';

@Component({
  selector: 'app-backpack-edit-add',
  templateUrl: 'backpack-edit-add.html',
  styleUrls: ['backpack-edit-add.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BackpackEditAdd {

  schoolForm: FormGroup;

  constructor(
    private skoolService: BackbackService, 
    public toastController: ToastController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public loadingController: LoadingController,
    private router: Router 
    ) { }

  schoolInfo: BackpackOptions = { uuid: "", name: "", address: "", email: "", nostudents: null, phone:null };

  passwordToVerify = null;

  get f() { return this.schoolForm.controls; }

  ngOnInit() {
    this.schoolForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nostudents: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  cancelCreateSchool(){
    this.router.navigate(['backpack/']);
  }


  onSubmit() {
    this.presentLoading();
    if (this.schoolForm.valid) {
      this.skoolService.createInstitution(this.schoolInfo).subscribe(({ data }) => {
        this.router.navigate(['/backpack']);
        this.showAlerts("Good Job", "successfully added school", "success");
      }, (error) => {
        if (error) {
          this.showAlerts("Error", error.networkError.error.errors[0].message, "danger");
        }
      });
    } else {
      this.getFormValidationErrors();
    }

  }

  async getFormValidationErrors() {
    Object.keys(this.schoolForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.schoolForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.showAlerts("Error", "invalid submittion, please check the form validation", "danger");
        });
      }
    });
  }

  async showAlerts(toast_header: string, toast_message: string, toast_color: string) {
    this.loadingController.dismiss();
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss();
  }
}
