import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( public authService: UserService, public router: Router) { }


  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  ngOnInit() {
  }

}
