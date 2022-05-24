import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.userService.signIn(email.value, password.value)
      .then((res) => {
        //Comprobar si existe la cuenta
        /*if(this.userService.isEmailVerified) {
          this.router.navigate(['dashboard']);
        }*/
        this.router.navigate(['pokedex']);
        console.log(res);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
