import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user.interface';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user!: User;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private authService:AuthService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      createdDate: [this.user.createdDate, Validators.required],
      role: [this.user.role, Validators.required],
    });

  }

  actualizarPerfil() {

    console.log(this.profileForm.value);

    if(this.profileForm.valid)
    {
      this.usuarioService
        .updateUser(this.profileForm.value, this.authService.uid || '')
        .subscribe(
          (data) => {
            //const { nombre, email } = this.profileForm.value;
            this.user = {
              ...this.user,
              ...this.profileForm.value,
            };

            Swal.fire(
              'Usuario Actualizado',
              'Cambios fueron Guardados',
              'success'
            );
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.error.msg, 'error');
          }
        );
      }
  }

}
