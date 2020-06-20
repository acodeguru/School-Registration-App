import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SkoolListPage } from './skool-list/skool-list.page';
import { BackpackRoutingModule } from './backpack-routing.module';
import { BackpackPage } from './backpack/backpack';
import { RouteReuseStrategy } from '@angular/router';
import { BackpackEditAdd } from './backpack-edit-add/backpack-edit-add';
// import { EditAddSkoolPage } from './skool-edit-add/edit-add-skool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BackpackRoutingModule
  ],
  declarations: [
    BackpackPage, 
    BackpackEditAdd
  ],

  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class BackpackModule {}
