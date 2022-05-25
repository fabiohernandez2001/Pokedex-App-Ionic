import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokedex',
    loadChildren: () => import('./pokedex/poke-collapse/poke-collapse.module').then( m => m.PokeCollapsePageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pokedex/poke-collapse/poke-collapse.module').then( m => m.PokeCollapsePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./user/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'abilitydex',
    loadChildren: () => import('./abilitydex/abilitydex.module').then( m => m.AbilitydexPageModule)
  },
  {
    path: 'naturedex',
    loadChildren: () => import('./naturedex/naturedex.module').then( m => m.NaturedexPageModule)
  },
  {
    path: 'movedex',
    loadChildren: () => import('./movedex/movedex.module').then( m => m.MovedexPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
