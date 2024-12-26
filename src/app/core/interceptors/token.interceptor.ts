import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const myToken = this.auth.getToken();

        let headers: { [key: string]: string } = {};

        if (myToken) {
            headers['Authorization'] = 'bearer ' + myToken;
        }

        request = request.clone({
            setHeaders: headers
        });

        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.router.navigate(['enter-passkey']);
                        this.auth.logOut();
                        return throwError(() => new Error('Session expired.'));
                    }
                }
                return throwError(() => new Error(error.message));
            })
        );
    }
}
