import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokeCollapsePage } from './poke-collapse.page';

const routes: Routes = [
  {
    path: '',
    component: PokeCollapsePage
  },  {
    path: 'pokemon-detail',
    loadChildren: () => import('./pokemon-detail/pokemon-detail.module').then( m => m.PokemonDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokeCollapsePageRoutingModule {}
