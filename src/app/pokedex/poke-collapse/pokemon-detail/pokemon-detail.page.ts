import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Pokemon} from '../../pokemon';
import {PokedexService} from '../../pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit{
  @Input() selected = 0;
  public pokemon: Pokemon;
  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    this.pokemon = this.pokedexService.getSelected();
  }
}
