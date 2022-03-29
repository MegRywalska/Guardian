import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AutorizationDto, BASE_URL} from "../../model";

const EMPTY_AUTHORIZATION_DTO =  {
  username: '',
  password: ''
}

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  authorizationDto: AutorizationDto;
  error: string|null;

  constructor(private  router: Router, private http: HttpClient) {
    this.authorizationDto = Object.assign({}, EMPTY_AUTHORIZATION_DTO);
    this.error = null;
  }

  clear(): void {
    this.authorizationDto = Object.assign({}, EMPTY_AUTHORIZATION_DTO);
  }

  ngOnInit(): void {
  }

  send(): void {
    this.http.post(BASE_URL + '/login', this.authorizationDto, {observe: 'response', withCredentials: false})
      .subscribe(
        (data) => {
          console.log("success");
          if (data.headers.has('Authorization')) {
            // Bearer:xyzc
            let authorizationHeader = data.headers.get("Authorization");
            if(authorizationHeader){
              let authorizationToken = authorizationHeader.substring(7);
              localStorage.setItem("auth_token", authorizationToken);
              this.router.navigate(['/']);
              return;
            }
          }
          this.error = 'Authorization header not found';
        },
        (error) => {
          console.log("failure");
          this.error = error;
        },
      );
  }

}
