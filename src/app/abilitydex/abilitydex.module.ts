import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbilitydexPageRoutingModule } from './abilitydex-routing.module';

import { AbilitydexPage } from './abilitydex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbilitydexPageRoutingModule
  ],
  declarations: [AbilitydexPage]
})
export class AbilitydexPageModule {}
