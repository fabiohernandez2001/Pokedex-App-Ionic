import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeCalculatorPageRoutingModule } from './type-calculator-routing.module';

import { TypeCalculatorPage } from './type-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeCalculatorPageRoutingModule
  ],
  declarations: [TypeCalculatorPage]
})
export class TypeCalculatorPageModule {}
