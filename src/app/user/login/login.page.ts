import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from "../user";
import {HttpErrorResponse} from "@angular/common/http";
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User[];

  constructor(public userService: UserService, public router: Router, public afStore: AngularFirestore) { }

  ngOnInit() {
  }

  /*public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  logIn(email, password) {
    this.userService.signIn(email.value, password.value)
      .then((res) => {
        //Comprobar si existe la cuenta
        /*if(this.userService.isEmailVerified) {
          this.router.navigate(['dashboard']);
        }*/
        this.router.navigate(['pokedex']);
        this.userService.update();
      }).catch((error) => {
        window.alert(error.message);
      });
    //this.getAllUsers();
    //this.userService.setUsers(this.users);
  }

}
