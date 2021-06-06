import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LagerPageRoutingModule } from './lager-routing.module';

import { LagerPage } from './lager.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LagerPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [LagerPage]
})
export class LagerPageModule {}
