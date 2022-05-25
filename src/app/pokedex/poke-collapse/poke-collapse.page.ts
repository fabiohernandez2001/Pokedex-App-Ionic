import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokedexService} from '../pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Pokemon} from '../pokemon';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import User = firebase.User;
import {Router} from "@angular/router";

@Component({
  selector: 'app-poke-collapse',
  templateUrl: './poke-collapse.page.html',
  styleUrls: ['./poke-collapse.page.scss'],
})
export class PokeCollapsePage implements OnInit {
  @Output() selected = new EventEmitter<number>();
  public pokedex: Pokemon[] | undefined;
  public environ = environment;
  private logged!: boolean;
  constructor(private pokedexService: PokedexService, public afStore: AngularFirestore,private router: Router){}

  ngOnInit() {
    this.getPokedex();
    const userid=JSON.parse(localStorage.getItem('user'));
    if(userid){
      this.logged=true;
    }else{
      this.logged=false;
    }
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
