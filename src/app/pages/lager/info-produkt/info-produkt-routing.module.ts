import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoProduktPage } from './info-produkt.page';

const routes: Routes = [
  {
    path: '',
    component: InfoProduktPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoProduktPageRoutingModule {}
