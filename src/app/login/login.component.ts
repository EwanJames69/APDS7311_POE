import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  username = new FormControl('');
  password = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void { }

  onSubmit(e: Event) {
    // Setting the defaults
    e.preventDefault();
    this.hasError = false;

    if (!this.username.value || !this.password.value)
    {
      this.hasError = true;
      this.errorMessage = 'Please fill out all the fields before continuing';
      return;
    }

    this.auth.login(this.username.value, this.password.value).subscribe({
      next: (v) => {
        const { token } = v as any;
        localStorage.setItem('Authorization', token);
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = 'Error logging in, check username or password';
      },
    });
  }
}