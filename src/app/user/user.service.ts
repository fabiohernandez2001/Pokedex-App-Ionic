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
  users!: User[];
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
    const user: User = {name : nameP, email: emailP, photo:''};
    this.setUserData(user);
    return a;
  }

  setUserData(user) {
    this.http.post('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json', user).subscribe(
        response=>console.log('Usuario creado: ' + user),
        error=> console.log('Error: ' + error),
    );
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
        (response) => {
        this.users = response;
          console.log(this.users);
          console.log(response);
          console.log(typeof this.users);
          const usuarios=this.users.toString().split(',');
          for(let i=0;0<usuarios.length;i++){
            const contenido=usuarios[i].split(': {')[1];
            for(const element of contenido){
              console.log('hola');
              console.log(element);
              console.log(emailP);
              if(emailP===element){
                console.log(element);
                console.log('SI');

              }
            }
          }
          /*
          for(const element of iter){
            console.log("hola");
            console.log(element);
            console.log(emailP);
            if(emailP===element){
              console.log(element);
              console.log("SI");
              return this.user;
            }
          };*/
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    return null;
  }

  conseguirUsuarios() {
    return this.http.get<User[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json');
  }
}
