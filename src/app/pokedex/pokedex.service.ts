import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import {Ability} from "../abilitydex/ability";
import {Nature} from "../naturedex/nature";
import {Move} from "../movedex/move";
import {Item} from "../itemdex/item";

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private apiServerUrl = 'https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/';
  private selected: Pokemon;
  private abilitySelected: Ability;

  constructor(public http: HttpClient) { }

  public getPokedex(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiServerUrl}pokedex.json`);
  }

  public setSelected(pokemon: Pokemon): void {
    this.selected = pokemon;
  }

  public getSelected(): Pokemon {
    return this.selected;
  }

  public getAbilities(): Observable<Ability[]> {
    return this.http.get<Ability[]>(`${this.apiServerUrl}abilities.json`);
  }

  public getNatures(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${this.apiServerUrl}natures.json`);
  }

  public getMoves(): Observable<Move[]> {
    return this.http.get<Move[]>(`${this.apiServerUrl}moves.json`);
  }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiServerUrl}items.json`);
  }
}
