import { Component, ViewEncapsulation, OnInit, Output, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterModal } from '../modal-filter/filter.modal';
import { Router } from '@angular/router';
import { SkoolService } from '@services/skool.service';
import { Skool } from '@models/skool.model';
import { EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-skool-list',
  templateUrl: 'skool-list.page.html',
  styleUrls: ['skool-list.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SkoolListPage implements  OnDestroy, OnInit {

  modelSkoolList: Skool[] = [];
  errors = [];

  searchTerm: string = "";
  subscription: Subscription;

  constructor(public modalController: ModalController, private router: Router, private skoolService: SkoolService) {
    this.subscription = this.skoolService.onSearchTerm().subscribe(searchTerm => {
      if (searchTerm) {
        this.setFilteredItems(searchTerm.trim());
      } else {
        this.setFilteredItems("");
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addSkool(){
    this.router.navigate(['skool/edit-add-skool']);
  }

  ngOnInit() {
    this.fetchSkools();  
  }


  fetchSkools(): void {
    this.skoolService.fetchSkools().subscribe((data: any) => {
      this.modelSkoolList = data.data.institutions.map(item => {
        let skool = new Skool();
        skool.setAll(item['uuid'], item['name'], item['address'], item['email'], item['phone'], item['nostudents']);
        return skool;
      });
      this.skoolService.setModelSkoolList(this.modelSkoolList);
    }, (error) => {
      if (error) {
        this.errors = error.networkError.error.errors;
      }
    });
  }

  setFilteredItems(searchTerm:string) {
    this.modelSkoolList = []
    this.modelSkoolList = this.skoolService.filterItems(searchTerm);
  }

  
}
