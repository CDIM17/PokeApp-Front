import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { MatError } from '@angular/material/form-field';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [Boolean(localStorage.getItem('remember') || false)],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {

    if(this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem(
              'email',
              this.loginForm.get('email')?.value || ''
            );
            localStorage.setItem(
              'remember',
              (this.loginForm.get('remember')?.value || '').toString()
            );
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          //Navegar al Dashboard
          this.router.navigate(['/pages/pokemons']);
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
    }

  }
}
