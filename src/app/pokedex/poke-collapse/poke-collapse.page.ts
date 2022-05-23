import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokedexService} from '../pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Pokemon} from '../pokemon';

@Component({
  selector: 'app-poke-collapse',
  templateUrl: './poke-collapse.page.html',
  styleUrls: ['./poke-collapse.page.scss'],
})
export class PokeCollapsePage implements OnInit {
  public pokedex: Pokemon[] | undefined;
  @Output() selected = new EventEmitter<string>();

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

  public changeNames(name: string) {
    this.selected.emit(name);
  }
}
