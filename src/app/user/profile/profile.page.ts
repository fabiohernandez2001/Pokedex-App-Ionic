import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user!: User;
  constructor(userService: UserService) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('user'));
  }


}
