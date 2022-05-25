import { Component, OnInit } from '@angular/core';
import {PokedexService} from "../pokedex/pokedex.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Item} from "./item";

@Component({
  selector: 'app-itemdex',
  templateUrl: './itemdex.page.html',
  styleUrls: ['./itemdex.page.scss'],
})
export class ItemdexPage implements OnInit {
  public items: Item[];

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.pokedexService.getItems().subscribe(
      (response: Item[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
