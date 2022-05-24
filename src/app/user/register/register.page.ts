import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;

  constructor(public userService: UserService, public router: Router, private formBuilder: FormBuilder) {
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
      validator: this.comparePasswdValidator('password', 'repeatPassword')
    });
  }

  name() {
    return this.form.get('userName');
  }

  email() {
    return this.form.get('email');
  }

  passwd() {
    return this.form.get('password');
  }

  rPasswd() {
    return this.form.get('repeatPassword');
  }

  onSubmit(){
    this.userService.registerUser(this.form.value.email,this.form.value.password,this.form.value.name)
      .then((res) => {
        console.log('Exito en la autenticación');
        this.router.navigate(['pokedex']);
      }).catch((error) => {
      window.alert(error.message);
    });
  }

  comparePasswdValidator(passwd: string, repeatPasswd: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[passwd];
      const matchingControl = formGroup.controls[repeatPasswd];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
