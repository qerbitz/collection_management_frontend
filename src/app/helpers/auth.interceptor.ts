import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes(`${this.authenticationService.apiUrl}/user/login`)) {
            return next.handle(request);
        }
        if (request.url.includes(`${this.authenticationService.apiUrl}/user/register`)) {
            return next.handle(request);
        }

        
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.authdata;
        const auth = sessionStorage.getItem('auth');
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        console.log(user+'....'+isLoggedIn+'..'+isApiUrl);
       // if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${auth}`
                }
            });
     //   }

        return next.handle(request);
    }
}