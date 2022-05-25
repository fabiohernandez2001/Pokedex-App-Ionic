import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';

import {User} from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  users!: Object[];
  constructor(public afStore: AngularFirestore, public ngFireAuth: AngularFireAuth, public router: Router, public ngZone: NgZone, public http: HttpClient) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  registerUser(emailP, password, nameP) {
    const a = this.ngFireAuth.createUserWithEmailAndPassword(emailP, password);
    console.log(nameP);
    const user: User = {name : nameP, email: emailP, photo:""};
    this.setUserData(user);
    return a;
  }

  setUserData(user) {
    /*this.http.post(`https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users/${this.getNumberArray() + 1}`, user).subscribe(
        response=>console.log("Usuario creado: " + user),
        error=> console.log("Error: " + error),
    );*/
    let userArray=this.conseguirUsuarios();
    return;
  }

  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  getUserByEmail(emailP): User {
    this.conseguirUsuarios().subscribe(
        (response:any[]) => {
        console.log(response);
        for(let i=0;i<this.users.length;i++){
          if(emailP==this.users[i]){
            return this.users[i];
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
      return null;
    };

  conseguirUsuarios():User[] {
    this.http.get<User[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json').subscribe(
      (response: User[]) =>{return response;},
      (error: HttpErrorResponse) => {
        return null;
        alert(error.message);
      }
    );
  }

  getNumberArray(){
    this.conseguirUsuarios().subscribe(
      (response :any[]) => {
        if (response == null){
          return 0;
        }else{
          console.log(response.length);
          return response.length;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    return 0;
  }
}
