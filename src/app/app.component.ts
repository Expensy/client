import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/login/login.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => this.user = user);
  }

  logout() {
    this.authService.logout();
  }
}
