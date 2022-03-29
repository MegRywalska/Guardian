import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/authorize']);
    return true;
  }

  private isLoggedIn() {
    let tokenFromStorage = localStorage.getItem("auth_token")
    if(tokenFromStorage){
      return true;
    }
    return false;
  }
}
