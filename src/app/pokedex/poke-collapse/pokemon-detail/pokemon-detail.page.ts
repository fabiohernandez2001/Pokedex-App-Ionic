import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Pokemon} from '../../pokemon';
import {PokedexService} from '../../pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SqlService} from '../../../sql.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit{
  @Input() selected = 0;
  public pokemon: Pokemon;
  public favorito: boolean;
  constructor(private pokedexService: PokedexService, private sqlite: SqlService) { }

  ngOnInit() {
    this.pokemon = this.pokedexService.getSelected();
    this.puta();
  }

  async puta() {
    if (this.sqlite.getFav(this.pokemon.name)) {
      this.favorito = true;
    } else {
      this.favorito = false;
    }
  }

  async change() {
    if (this.sqlite.getFav(this.pokemon.name)) {
      this.favorito = false;
      this.sqlite.deleteFav(this.pokemon.name);
    } else {
      this.favorito = true;
      await this.sqlite.addFav(this.pokemon.name);
    }
  }
}
