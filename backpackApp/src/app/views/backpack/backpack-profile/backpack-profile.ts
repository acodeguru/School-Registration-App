import { Component, ViewEncapsulation  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-backpack-profile',
  templateUrl: 'backpack-profile.html',
  encapsulation: ViewEncapsulation.None,
})
export class BackpackProfilePage {

  constructor(public modalController: ModalController, private authService: AuthService, private router: Router) { 
 
  }

  logout() {
    this.authService.logout();
    this.dismissModal();
    this.router.navigate(['/']);
  }

  async dismissModal() {
    await  this.modalController.dismiss();
  }

}
