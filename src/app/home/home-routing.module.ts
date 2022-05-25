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
  },
  {
    path: 'itemdex',
    loadChildren: () => import('../itemdex/itemdex.module').then( m => m.ItemdexPageModule)
  },
  {
    path: 'type-calculator',
    loadChildren: () => import('../type-calculator/type-calculator.module').then( m => m.TypeCalculatorPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('../favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../user/profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
