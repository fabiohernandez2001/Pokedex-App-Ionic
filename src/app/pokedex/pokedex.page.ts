import {Component} from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage {
  selected = 'Bulbasaur';
  constructor() {

  }
  onChanges(name: string) {
    this.selected = name;
  }
}
