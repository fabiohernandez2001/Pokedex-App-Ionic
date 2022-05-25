import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemdexPage } from './itemdex.page';

const routes: Routes = [
  {
    path: '',
    component: ItemdexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemdexPageRoutingModule {}
