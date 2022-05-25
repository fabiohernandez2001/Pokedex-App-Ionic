import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemdexPageRoutingModule } from './itemdex-routing.module';

import { ItemdexPage } from './itemdex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemdexPageRoutingModule
  ],
  declarations: [ItemdexPage]
})
export class ItemdexPageModule {}
