import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'page-backpack-filter',
  templateUrl: 'backpack-filter.html',
  styleUrls: ['./backpack-filter.scss'],
})
export class BackpackFilterPage {

  filterBy: string ;
  sortBy: string ;

  constructor(public modalController: ModalController) { 
 
  }

  radioGroupChangeSortBy(event){
    this.sortBy = event.detail.value;
  }

  radioGroupChangeFilterBy(event){
    this.filterBy = event.detail.value;
  }

  async dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    let data = { 'filterBy': this.filterBy, 'sortBy': this.sortBy };
    await  this.modalController.dismiss(data);
  }
  
}
