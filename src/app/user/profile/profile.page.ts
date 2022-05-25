import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user!: User;
  form! : FormGroup;

  constructor(public userService: UserService, public router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn){
      this.router.navigate(["/login"]);
    } else{
      let emailP = JSON.parse(localStorage.getItem('user')).email;
      this.http.get<User[]>('https://pokeapp-9cf2b-default-rtdb.europe-west1.firebasedatabase.app/users.json').subscribe(
        (response:User[]) => {
        for(let i=0;i< response.length;i++){
          if(emailP==response[i].email){
            //console.log("SI");
            this.user = response[i];
            //console.log(this.user);
          }
        }
      });
      //this.user= this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')).email);
      console.log(this.user);
      this.form=this.initForm();
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
