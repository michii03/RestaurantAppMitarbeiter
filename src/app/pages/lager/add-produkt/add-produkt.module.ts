import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProduktPageRoutingModule } from './add-produkt-routing.module';

import { AddProduktPage } from './add-produkt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProduktPageRoutingModule
  ],
  declarations: [AddProduktPage]
})
export class AddProduktPageModule {}
