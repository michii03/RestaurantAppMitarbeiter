import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoProduktPageRoutingModule } from './info-produkt-routing.module';

import { InfoProduktPage } from './info-produkt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoProduktPageRoutingModule
  ],
  declarations: [InfoProduktPage]
})
export class InfoProduktPageModule {}
