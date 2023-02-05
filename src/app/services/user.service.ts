import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private baseService:BaseService,
             private authService:AuthService) {}


  getUsers() {
    const url = `${backend_url}/users`;

    return this.baseService.get<User>(url);
  }

  createUser(formData: any) {
    return this.baseService.post(`${backend_url}/users`, formData).pipe(
      tap((data: any) => {
        this.authService.guardarLocalStorage(data.token);
      })
    );
  }

  updateUser(data:any,id:string) {

    return this.baseService.put(`${backend_url}/users`,id,data);
  }

  deleteUser(usuario: User) {
    const url = `${backend_url}/usuarios/${usuario._id}`;

    return this.baseService.delete(url,usuario._id);
  }
}
