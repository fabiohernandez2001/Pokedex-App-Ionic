import { Component, OnInit } from '@angular/core';
import {Move} from './move';
import {PokedexService} from '../pokedex/pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-movedex',
  templateUrl: './movedex.page.html',
  styleUrls: ['./movedex.page.scss'],
})
export class MovedexPage implements OnInit {
  public moves: Move[];

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getMoves();
  }

  public getMoves(): void {
    this.pokedexService.getMoves().subscribe(
      (response: Move[]) => {
        this.moves = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
