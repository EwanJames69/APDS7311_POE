import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLoggedIn = this.auth.isLoggedIn;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
