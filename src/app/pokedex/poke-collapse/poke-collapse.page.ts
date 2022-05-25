import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokedexService} from '../pokedex.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Pokemon} from '../pokemon';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import User = firebase.User;
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

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
  private path: string;
  constructor(private pokedexService: PokedexService, public afStore: AngularFirestore, private router: Router, private userService: UserService){}

  ngOnInit() {
    this.getPokedex();
    const userid = this.userService.isLoggedIn;
    if(userid){
      this.path='profile';
    }else{
      console.log(userid);
      this.path='login';
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

  public signOut(){
    this.userService.signOut().then(r => {
      console.log('Sesión cerrada');
      this.router.navigate(['pokedex']);
    }).catch((error)=>{
      console.log(error);
    });
  }
}
