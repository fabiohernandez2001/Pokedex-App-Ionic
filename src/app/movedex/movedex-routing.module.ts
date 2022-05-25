import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovedexPage } from './movedex.page';

const routes: Routes = [
  {
    path: '',
    component: MovedexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovedexPageRoutingModule {}
