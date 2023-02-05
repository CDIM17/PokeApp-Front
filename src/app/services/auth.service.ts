import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { BaseService } from './base.service';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: User;

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get uid(): string | undefined {
    return this.user._id;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.getToken,
      },
    };
  }

  constructor(private baseService: BaseService, private router: Router) {}

  login(formData: any) {
    return this.baseService.post(`${backend_url}/login`, formData).pipe(
      tap((data: any) => {
        this.guardarLocalStorage(data.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');
  }

  guardarLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  validarToken() {
    const token = localStorage.getItem('token') || '';

    return this.baseService.get(`${backend_url}/login/renew`).pipe(
      tap((resp: any) => {
        this.user = resp.user;
        this.guardarLocalStorage(resp.token);
      }),
      map((resp) => {
        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
