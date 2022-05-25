import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public users: User[] | undefined;
  public user!: User | undefined;
  public form! : FormGroup;

  constructor(public userService: UserService, public router: Router, private formBuilder: FormBuilder, public http: HttpClient) { }

  ngOnInit() : void {
    this.getUsers();
    //this.user = this.getUserByEmail(localStorage.getItem('user'));
      /*for (let i = 0; i < this.users.length; i++) {
        console.log(JSON.parse(localStorage.getItem('user')).name);
        setTimeout(() => { this.router.navigate(['/']);}, 5000);
        if (this.users[i].email == JSON.parse(localStorage.getItem('user')).email)  {
          this.user = this.users[i];
        }
      }*/
    console.log(this.user);
    /*while (this.user == null){
      this.getUsers();
    }
    this.form = this.initForm();*/
    this.form = this.initForm();
    
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

  public getUserByEmail(email : String) : User{
    for (let i = 0; i < this.users.length; i++){
      if (email == this.users[i].email){
        return this.users[i];
      }
    }
    return null;
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

  public getUsers(): void {
    this.userService.getpdw().subscribe(
      (response: User[]) => {
        console.log(response);
        this.users = response;
        for (let i = 0; i < this.users.length; i++){
          if (localStorage.getItem('user') == this.users[i].email){
            this.user = this.users[i];
            console.log(this.user);
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
