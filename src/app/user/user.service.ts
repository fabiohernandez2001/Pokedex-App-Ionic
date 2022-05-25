import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';

import {User} from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: any;
  users!: Object[];
  allUsers: User[];
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

  async getUserByEmail(emailP) {
    this.http.get<User[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json').subscribe(
        (response:User[]) => {
        console.log(response);
        for(let i=0;i< response.length;i++){
          console.log(response[i]);
          if(emailP==response[i].email){
            console.log("SI");
            return response[i];
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
      return {email: "feo@feo.es", name: "feo", photo: ""};
    }

  setUserData(user) {
    this.http.get<any[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json').subscribe(
      (response : any[]) => {
        if (response != null){
          response.push(user);
          return this.http.put("https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json", response).subscribe(
            response=>console.log("Usuario creado: " + user),
            error=> console.log("Error: " + error),
          );
        }else{
          user = { 0 : user};
          return this.http.put("https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json", user).subscribe(
            response=>console.log("Usuario creado: " + user),
            error=> console.log("Error: " + error),
        );}
        },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
    return null;
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
  }

  public setUsers(users: User[]) {
    this.allUsers = users;
  }

  public getUsers() {
    return this.allUsers;
  }
}
