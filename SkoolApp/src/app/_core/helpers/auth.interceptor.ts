import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const currentUser = this.authService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.login.token;
        const authToken = isLoggedIn ? currentUser.login.token : null;

        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + authToken
            }
        });
        return next.handle(req);
    }
}
