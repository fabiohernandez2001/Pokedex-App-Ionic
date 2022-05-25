import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeCalculatorPage } from './type-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: TypeCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeCalculatorPageRoutingModule {}
