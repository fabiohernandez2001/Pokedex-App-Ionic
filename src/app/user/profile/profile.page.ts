import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {waitForAsync} from "@angular/core/testing";
import {Pokemon} from "../../pokedex/pokemon";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public users: User[];
  public user!: User;
  public form! : FormGroup;

  constructor(public userService: UserService, public router: Router, private formBuilder: FormBuilder, public http: HttpClient) { }

  async ngOnInit() {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(["/login"]);
    } else {
      this.users = this.userService.getUsers();
      for (let i = 0; i < this.users.length; i++) {
        console.log(JSON.parse(localStorage.getItem('user')).name);
        if (this.users[i].email == JSON.parse(localStorage.getItem('user')).email)  {
          this.user = this.users[i];
        }
      }
      this.form = this.initForm();
    }
  }

  signOut(){
    this.userService.signOut().then(r => {
      console.log('Sesión cerrada');
      this.router.navigate(['pokedex']);
    }).catch((error)=>{
      console.log(error);
    });
  }

  initForm():FormGroup{
    console.log(this.user);
    return this.formBuilder.group({
      userName:[this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log(this.form.value.userName);
    console.log(this.form.value.email);
  }

  get name(){
    return this.form.value.userName;
  }

  get email(){
    return this.form.value.email;
  }

  get passwd(){
    return this.form.value.password;
  }
}
