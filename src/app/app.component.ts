import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;
  isCollapsed: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isCollapsed = true;
    this.authService.user.subscribe((user) => this.user = user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
