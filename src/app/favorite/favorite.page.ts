import { Component, OnInit } from '@angular/core';
import {SqlService} from "../sql.service";
import {Pokemon} from "../pokedex/pokemon";
import {PokedexService} from "../pokedex/pokedex.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  public pokedex: Pokemon[] | undefined;
  public pokemonGen: Pokemon;

  constructor(private sqlite: SqlService, private pokedexService: PokedexService) { }

  ngOnInit() {
    this.getPokedex()
  }

  public getPokedex(): void {
    this.pokedexService.getPokedex().subscribe(
      (response: Pokemon[]) => {
        this.pokedex = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  generatePokemon(pokemon: string) {
    for (let i = 0; i < this.pokedex.length; i++) {
      if (pokemon == this.pokedex[i].name)
        return this.pokedex[i];
    }
  }

  changeNames(pokemon: Pokemon) {
    this.pokedexService.setSelected(pokemon);
  }
}
