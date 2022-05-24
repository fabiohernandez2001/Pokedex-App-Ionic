import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokedexService} from '../pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Pokemon} from '../pokemon';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-poke-collapse',
  templateUrl: './poke-collapse.page.html',
  styleUrls: ['./poke-collapse.page.scss'],
})
export class PokeCollapsePage implements OnInit {
  @Output() selected = new EventEmitter<number>();
  public pokedex: Pokemon[] | undefined;
  public environ = environment;

  constructor(private pokedexService: PokedexService){}

  ngOnInit() {
    this.getPokedex();
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

  public changeNames(pokemon: Pokemon) {
    this.pokedexService.setSelected(pokemon);
  }

  toString(i: number) {
    return String(i);
  }
}
