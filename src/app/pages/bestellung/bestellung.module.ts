import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestellungPageRoutingModule } from './bestellung-routing.module';

// Pages
import { BestellungPage } from './bestellung.page';
// import { ProduktePage } from './produkte/produkte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestellungPageRoutingModule,

    // Pages
    // ProduktePage
  ],
  declarations: [BestellungPage]
})
export class BestellungPageModule {}
