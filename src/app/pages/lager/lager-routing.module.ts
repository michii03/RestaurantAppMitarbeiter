import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LagerPage } from './lager.page';

const routes: Routes = [
  {
    path: '',
    component: LagerPage
  },
  {
    path: 'add-produkt',
    loadChildren: () => import('./add-produkt/add-produkt.module').then( m => m.AddProduktPageModule)
  },
  {
    path: 'info-produkt',
    loadChildren: () => import('./info-produkt/info-produkt.module').then( m => m.InfoProduktPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LagerPageRoutingModule {}
