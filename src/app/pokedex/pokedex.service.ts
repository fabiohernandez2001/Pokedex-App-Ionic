import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import {Ability} from "../abilitydex/ability";

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

  public setAbilitySelected(ability: Ability): void {
    this.abilitySelected = ability;
  }

  public getAbilitySelected(): Ability {
    return this.abilitySelected;
  }
}
