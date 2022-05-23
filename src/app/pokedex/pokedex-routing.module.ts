import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokedexPage } from './pokedex.page';

const routes: Routes = [
  {
    path: '',
    component: PokedexPage
  },
  {
    path: 'poke-collapse',
    loadChildren: () => import('./poke-collapse/poke-collapse.module').then( m => m.PokeCollapsePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexPageRoutingModule {}
