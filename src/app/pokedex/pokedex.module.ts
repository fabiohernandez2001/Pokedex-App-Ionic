import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokedexPageRoutingModule } from './pokedex-routing.module';

import { PokedexPage } from './pokedex.page';
import { HttpClient } from '@angular/common/http';
import {PokeCollapsePageModule} from './poke-collapse/poke-collapse.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokedexPageRoutingModule,
    PokeCollapsePageModule
  ],
  declarations: [PokedexPage]
})
export class PokedexPageModule {}
