import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {PokedexPageModule} from '../pokedex/pokedex.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pokedex',
    loadChildren: () => import('../pokedex/pokedex.module').then( m => m.PokedexPageModule)
  },
  {
    path: 'abilitydex',
    loadChildren: () => import('../abilitydex/abilitydex.module').then( m => m.AbilitydexPageModule)
  },
  {
    path: 'naturedex',
    loadChildren: () => import('../naturedex/naturedex.module').then( m => m.NaturedexPageModule)
  },
  {
    path: 'movedex',
    loadChildren: () => import('../movedex/movedex.module').then( m => m.MovedexPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
