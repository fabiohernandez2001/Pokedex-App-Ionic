import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';
import {User} from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: any;
  users: User[] | undefined;

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

  public signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  public registerUser(emailP, password, nameP) {
    const a = this.ngFireAuth.createUserWithEmailAndPassword(emailP, password);
    console.log(nameP);
    const user: User = {name : nameP, email: emailP, photo:""};
    this.setUserData(user);
    return a;
  }

  public signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  /*async getUserByEmail(emailP) {
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
  }*/

  public setUserData(user) {
    this.http.get<any[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json').subscribe(
      (response : any[]) => {
        if (response != null){
          response.push(user);
          return this.http.put("https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json", response).subscribe(
            response=>console.log("Usuario creado: " + user),
            error=> console.log("Error: " + error)
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

  /*public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
  }

  public setUsers(users: User[]) {
    this.allUsers = users;
  }

  public getUsers() {
    return this.allUsers;
  }*/

  public getUserByEmail(email) : User{
    for (let i = 0; i < this.users.length; i++){
      if (email == this.users[i].email){
        return this.users[i];
      }
    }
    return null;
  }

  public setUsers(usuarios : User[] ){
    this.users =usuarios;
  }

  public getpdw() : Observable<User[]>{
    return this.http.get<User[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json');
  }

  public update(user) : void{
    this.http.get<User[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json').subscribe(
      (response : User[]) => {
        for (let i = 0; i < response.length; i++){
          if (user.email == response[i].email){
            response[i].name = user.name;
            response[i].photo = user.photo;
          }
        }
        return this.http.put("https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json", response).subscribe(
          response=>console.log("Usuario actualizado: " + user),
          error=> console.log("Error: " + error),
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
    return null;
  }

  /*uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = environment.firebaseConfig.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64) {
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }*/
}
