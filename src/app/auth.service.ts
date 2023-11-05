import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly BASE_URL = 'https://localhost:3002/api/users';
  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('Authorization');
    return token ? true : false;
  }

  get token() {
    return localStorage.getItem('Authorization');
  }

  login(username: string, password: string) {
    return this.http.post(`${this.BASE_URL}/login`, {username, password});
  }

  logout(): void {
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);
  }

  signup(
    username: string,    
    password: string,
    fullName: string,
    phoneNumber: string,
  )
  {
    return this.http.post(`${this.BASE_URL}/signup`, { 
      username,
      password,
      fullName,
      phoneNumber,      
    });
  }
}
