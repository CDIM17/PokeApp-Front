import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private linkTheme = document.querySelector('#theme');
  public user!:User;

  constructor(private authService:AuthService) {

    const url = './assets/css/colors/default-dark.css';

    this.linkTheme?.setAttribute('href', url);
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout()
  {
    this.authService.logout();
  }
}
