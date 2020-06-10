import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MenuController, ModalController } from '@ionic/angular';
import { FilterModal } from './modal-filter/filter.modal';
import { TitleService } from '@services/title.service';
import { Title } from '@angular/platform-browser';
import { SkoolService } from '@services/skool.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ProfileModal } from './modal-profile/profile.modal';

@Component({
  selector: 'app-skool',
  templateUrl: 'skool.page.html'
})
export class SkoolPage implements OnInit{

  title = null;
  public searchTerm: string = "";
  public searchControl: FormControl;
  searching: any = false;
  filterBy:string = "name";
  sortBy:string = "name";

  constructor(public modalController: ModalController, private titleService: Title, private skoolService: SkoolService) {
    this.searchControl = new FormControl();
  }

  async filterModal() {
    const modal = await this.modalController.create({
      component: FilterModal,
      componentProps: { 
        filterBy: this.filterBy,
        sortBy: this.sortBy
      },
      cssClass: 'my-custom-class'
    });
    
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.skoolService.setFilterBy(dataReturned.data.filterBy);
        this.filterBy = dataReturned.data.filterBy;
      }
    });
    return await modal.present();
  }

  async profileModal() {
    const modal = await this.modalController.create({
      component: ProfileModal,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  ngOnInit() {
    this.setFilteredItems();

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.searching = false;
        this.searchTerm = search;
        this.setFilteredItems();
      });
  }

  onSearchInput(){
      this.searching = true;     
  }

  setFilteredItems() {
    this.skoolService.sendSearchTerm(this.searchTerm);
  }
 
}
