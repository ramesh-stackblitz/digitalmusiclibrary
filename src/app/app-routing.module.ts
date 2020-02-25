import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';


const routes: Routes = [
  {
    path: '',
    component: AlbumlistComponent
  },
  {
    path: 'admin',
    component: AdminComponent

  },
  {
    path: 'albumlist',
    component: AlbumlistComponent

  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
