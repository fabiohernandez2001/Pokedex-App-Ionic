import { Component, OnInit } from '@angular/core';
import {Nature} from './nature';
import {PokedexService} from '../pokedex/pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-naturedex',
  templateUrl: './naturedex.page.html',
  styleUrls: ['./naturedex.page.scss'],
})
export class NaturedexPage implements OnInit {
  public natures: Nature[] | undefined;

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getNatures();
  }

  public getNatures(): void {
    this.pokedexService.getNatures().subscribe(
      (response: Nature[]) => {
        this.natures = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
