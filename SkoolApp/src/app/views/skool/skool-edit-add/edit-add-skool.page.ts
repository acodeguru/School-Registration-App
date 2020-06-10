import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Skool } from '@models/skool.model';
import { SkoolService } from '@services/skool.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-add-skool',
  templateUrl: 'edit-add-skool.page.html',
  styleUrls: ['edit-add-skool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditAddSkoolPage {

  @ViewChild('skoolForm') formValues: any;
  skoolForm: FormGroup;


  constructor(
    private skoolService: SkoolService, 
    public toastController: ToastController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public loadingController: LoadingController,
    private router: Router 
    ) { }

  skoolModel = new Skool();
  passwordToVerify = null;

  get f() { return this.skoolForm.controls; }

  ngOnInit() {
    this.skoolForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nostudents: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  async onSubmit() {
    await this.presentLoading();
    if (this.skoolForm.valid) {
      this.skoolService.createInstitution(this.skoolModel).subscribe(({ data }) => {
        this.router.navigate(['/skool']);
        this.showAlerts("Good Job", "successfully added skool", "success");
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
    Object.keys(this.skoolForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.skoolForm.get(key).errors;
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
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss();
  }
}
