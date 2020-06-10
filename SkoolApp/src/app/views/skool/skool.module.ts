import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkoolListPage } from './skool-list/skool-list.page';
import { SkoolRoutingModule } from './skool-routing.module';
import { SkoolPage } from './skool.page';
import { RouteReuseStrategy } from '@angular/router';
import { EditAddSkoolPage } from './skool-edit-add/edit-add-skool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SkoolRoutingModule
  ],
  declarations: [
    SkoolListPage,
    EditAddSkoolPage,
    SkoolPage
  ],

  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class SkoolModule {}
