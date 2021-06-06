import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestellungPage } from './bestellung.page';

const routes: Routes = [
  {
    path: '',
    component: BestellungPage
  },
  {
    path: 'produkte',
    loadChildren: () => import('./produkte/produkte.module').then( m => m.ProduktePageModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestellungPageRoutingModule {}
