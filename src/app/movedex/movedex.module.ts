import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovedexPageRoutingModule } from './movedex-routing.module';

import { MovedexPage } from './movedex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovedexPageRoutingModule
  ],
  declarations: [MovedexPage]
})
export class MovedexPageModule {}
