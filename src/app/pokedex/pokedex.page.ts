import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Pokemon} from './pokemon';
import {PokedexService} from './pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  /*@Output() selected = new EventEmitter<string>();
  public pokedex: Pokemon[] | undefined;
  public isCollapsed = true;*/

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    /*if (this.pokedex == null) {
      this.getPokedex();
    }*/
  }

  /*public getPokedex(): void {
    this.pokedexService.getPokedex().subscribe(
      (response: Pokemon[]) => {
        this.pokedex = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  /*public changeNames(name: string) {
    this.selected.emit(name);
  }*/
}
