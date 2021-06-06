import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProduktPage } from './add-produkt.page';

const routes: Routes = [
  {
    path: '',
    component: AddProduktPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProduktPageRoutingModule {}
