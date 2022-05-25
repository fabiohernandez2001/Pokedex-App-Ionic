import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbilitydexPage } from './abilitydex.page';

const routes: Routes = [
  {
    path: '',
    component: AbilitydexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbilitydexPageRoutingModule {}
