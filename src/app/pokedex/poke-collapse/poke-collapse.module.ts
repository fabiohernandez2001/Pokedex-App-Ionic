import { NgModule, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokeCollapsePageRoutingModule } from './poke-collapse-routing.module';

import { PokeCollapsePage } from './poke-collapse.page';

class Pokemon {
}



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokeCollapsePageRoutingModule
  ],
  declarations: [PokeCollapsePage]
})
export class PokeCollapsePageModule {
  public pokedex: Pokemon[] | undefined;
  @Output() selected = new EventEmitter<string>();}
