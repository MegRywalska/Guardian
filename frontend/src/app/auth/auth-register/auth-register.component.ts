import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {RegistrationDTO} from "../../model";

const EMPTY_REGISTRATION_DTO = {
  username:  '',
  password:  '',
  firstname: '',
  lastname: '',
}

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  registrationDto: RegistrationDTO;
  error: string|null;

  constructor(private router: Router, private http: HttpClient) {
    this.registrationDto = Object.assign({}, EMPTY_REGISTRATION_DTO);
    this.error = null;
  }

  ngOnInit(): void {
  }

  send(){

  }
}
