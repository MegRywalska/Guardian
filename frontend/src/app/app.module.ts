import {NgModule, TRANSLATIONS_FORMAT} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {HeaderNavigatorComponent} from './header-navigator/header-navigator.component';
import {AppRoutingModule} from "./app-routing.module";
import {ListUsersComponent} from './list-users/list-users.component';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {AuthRegisterComponent} from './auth/auth-register/auth-register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthGuard} from "./auth/auth-guard";
import {AuthInterceptor} from "./auth/auth-interceptor";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavigatorComponent,
    ListUsersComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
