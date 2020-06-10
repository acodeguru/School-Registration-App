import { Component, ViewEncapsulation, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-filter',
  templateUrl: 'filter.modal.html',
  encapsulation: ViewEncapsulation.None,
})
export class FilterModal {

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
