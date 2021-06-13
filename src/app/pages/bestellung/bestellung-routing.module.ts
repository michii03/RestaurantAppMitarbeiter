import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestellungPage } from './bestellung.page';

const routes: Routes = [
  {
    path: '',
    component: BestellungPage,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestellungPageRoutingModule {}
