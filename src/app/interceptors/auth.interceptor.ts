import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (
      request.url.toString().indexOf('/renew') >= 0 ||
      request.url.toString().indexOf('/users') >= 0
    ) {
      const newRequest = request.clone({
        headers: request.headers.set('x-token', this.authService.getToken),
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
