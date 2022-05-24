import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private apiServerUrl = 'https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/';
  private selected: Pokemon;

  constructor(public http: HttpClient) { }

  public getPokedex(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiServerUrl}pokedex.json`);
  }

  public getPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiServerUrl}pokedex/` + this.selected + `.json`);
  }

  public setSelected(pokemon: Pokemon): void {
    this.selected = pokemon;
  }

  public getSelected(): Pokemon {
    return this.selected;
  }
}
