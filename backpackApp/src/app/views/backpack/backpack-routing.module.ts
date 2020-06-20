import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackpackPage } from './backpack/backpack';
import { BackpackEditAdd } from './backpack-edit-add/backpack-edit-add';

const routes: Routes = [
  {
    path: '',
    component: BackpackPage ,
    data: {
      title: 'Backpack'
    },
  },
  {
    path: 'school-edit-add',
    component: BackpackEditAdd ,
    data: {
      title: 'Register a new School '
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackpackRoutingModule {}
