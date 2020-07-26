import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../model/user-credentials.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCredentials: UserCredentials = {
    emailAddress: null,
    password: null
  };

  constructor() { }

  ngOnInit(): void {
  }

}
