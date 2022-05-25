import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Ability} from './ability';
import {PokedexService} from '../pokedex/pokedex.service';
import {merge, Observable, OperatorFunction, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {IonSearchbar} from "@ionic/angular";
import {Pokemon} from "../pokedex/pokemon";

@Component({
  selector: 'app-abilitydex',
  templateUrl: './abilitydex.page.html',
  styleUrls: ['./abilitydex.page.scss'],
})
export class AbilitydexPage implements OnInit {
  public abilities!: Ability[];
  public names!: string[];

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getAbilities();
  }

  public getAbilities(): void {
    this.pokedexService.getAbilities().subscribe(
      (response: Ability[]) => {
        this.abilities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public changeNames(ability: Ability) {
    this.pokedexService.setAbilitySelected(ability);
  }
}
