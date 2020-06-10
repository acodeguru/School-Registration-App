import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_core/helpers/auth.guard';
import { NotLoggedInGuard } from './_core/helpers/not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Skool App'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
        canActivate: [NotLoggedInGuard]
      },
      {
        path: 'skool',
        loadChildren: () => import('./views/Skool/skool.module').then(m => m.SkoolModule),
        canActivate: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
