import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { BackpackFilterPage } from '../backpack-filter/backpack-filter';
import { BackpackProfilePage } from '../backpack-profile/backpack-profile';
import { BackbackService } from '@services/backpack.service';
import { BackpackOptions } from '@interfaces/backpack-options';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'page-backpack',
  templateUrl: 'backpack.html',
  styleUrls: ['./backpack.scss'],
})
export class BackpackPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  @ViewChild('backpackList', { static: true }) backpackList: IonList;

  shownBackpackList: BackpackOptions[] = [];
  errors = [];
  public searchTerm: string = "";
  public searchControl: FormControl;
  searching: any = false;

  
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  filterBy:string = "name";
  sortBy:string = "name";
  showSearchbar: boolean;

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    public backbackService:BackbackService
  ) { 

    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.updateSchoolList();
  
    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.searching = false;
        this.searchTerm = search;
        this.setFilteredItems();
    });

    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() {
    this.updateSchoolList();
  }

  onSearchInput(){
    this.searching = true;     
  }

  setFilteredItems() {
    this.shownBackpackList = this.backbackService.filterItems(this.searchTerm);
  }

  addSchool(){
    this.router.navigate(['backpack/school-edit-add']);
  }

  viewBackpackProfile(){
    this.presentProfile();
  }


  updateSchoolList() {
    this.backbackService.fetchSkools().subscribe((data: any) => {
      this.shownBackpackList = data.data.institutions.map(item => {
        let shownBackpack: BackpackOptions = { uuid: item['uuid'], name: item['name'], address:item['address'], email:item['email'], nostudents:item['phone'], phone:item['nostudents'] };
        return shownBackpack;
      });

      this.backbackService.setModelSkoolList(this.shownBackpackList);

    }, (error) => {
      if (error) {
        this.errors = error.networkError.error.errors;
      }
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: BackpackFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        filterBy: this.filterBy,
        sortBy: this.sortBy
      },
    });
    await modal.present();

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.backbackService.setFilterBy(dataReturned.data.filterBy);
        this.filterBy = dataReturned.data.filterBy;
      }
    });
  }

  async presentProfile() {
    const modal = await this.modalCtrl.create({
      component: BackpackProfilePage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
  }
  
}
