import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('auth_token');

    if (idToken !== null && idToken !== '' && req !== undefined) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer:' + idToken)});
      return next.handle(cloned).pipe(
        tap((event: any) => {
          console.log(event);
        }, (error: { status: number; message: string; }) => {
          if (error.status === 403 || error.status === 401) {
            localStorage.removeItem("auth_token");
            console.log("Logged out")
          }
          if (error.message === 'ERR_CONNECTION_REFUSED') {
            localStorage.removeItem("auth_token");
            console.log("Logged out")
          }
          // http response status code
          console.log('----response----');
          console.error('status code:');
          console.error(error.status);
          console.error(error.message);
          console.log('--- end of response---');

        })
      );
    } else {
      return next.handle(req);
    }
  }

}
