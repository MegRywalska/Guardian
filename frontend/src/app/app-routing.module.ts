import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListUsersComponent} from './list-users/list-users.component';
import {AuthRegisterComponent} from "./auth/auth-register/auth-register.component";
import {AuthLoginComponent} from "./auth/auth-login/auth-login.component";
import {AuthGuard} from "./auth/auth-guard";
import {HOME} from "@angular/cdk/keycodes";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'users', component:ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'authorize', component: AuthLoginComponent },
  { path: 'register', component: AuthRegisterComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
