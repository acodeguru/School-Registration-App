import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkoolListPage } from './skool-list/skool-list.page';
import { SkoolPage } from './skool.page';
import { EditAddSkoolPage } from './skool-edit-add/edit-add-skool.page';

const routes: Routes = [
  {
    path: '',
    component: SkoolPage ,
    data: {
      title: 'Skool'
    },
    children: [
      {
        path: '',
        component: SkoolListPage ,
        data: {
          title: ''
        }
      },

      {
        path: 'edit-add-skool',
        component: EditAddSkoolPage ,
        data: {
          title: 'Register a new skool '
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkoolRoutingModule {}
