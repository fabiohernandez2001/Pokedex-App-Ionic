import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NaturedexPageRoutingModule } from './naturedex-routing.module';

import { NaturedexPage } from './naturedex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NaturedexPageRoutingModule
  ],
  declarations: [NaturedexPage]
})
export class NaturedexPageModule {}
