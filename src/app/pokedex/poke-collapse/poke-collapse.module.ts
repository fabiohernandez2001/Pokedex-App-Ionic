import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokeCollapsePageRoutingModule } from './poke-collapse-routing.module';

import { PokeCollapsePage } from './poke-collapse.page';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PokeCollapsePageRoutingModule
    ],
    exports: [
        PokeCollapsePage
    ],
    declarations: [PokeCollapsePage]
})
export class PokeCollapsePageModule {
 }
