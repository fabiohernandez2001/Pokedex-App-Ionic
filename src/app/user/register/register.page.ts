import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from "../user.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;

  constructor( public authService: UserService, public router: Router, private formBuilder : FormBuilder) { }
 

  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)      
      .then((res) => {
        console.log("Exito en la autenticación");
        this.router.navigate(['pokedex']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    }, {
      validator: comparePasswdValidator('password', 'repeatPassword')
    })
  }

  get name(){
    return this.form.get('userName');
  }

  get email(){
    return this.form.get('email');
  }

  get passwd(){
    return this.form.get('password');
  }

  get rPasswd(){
    return this.form.get('repeatPassword');
  }
  
}

function comparePasswdValidator(passwd: string, repeatPasswd: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[passwd];
    const matchingControl = formGroup.controls[repeatPasswd];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
    } else {
        matchingControl.setErrors(null);
    }
  }
}
