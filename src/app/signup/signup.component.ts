import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit{

  username = new FormControl('');
  fullName = new FormControl('');
  phoneNumber = new FormControl('');  
  password = new FormControl('');
  confirmPassword = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void { }

  onSubmit(e: Event) {
    // Setting the defaults
    e.preventDefault();
    this.hasError = false;

    // Checking the fields for values
    if (
      !this.username.value ||
      !this.fullName.value ||
      !this.phoneNumber.value ||
      !this.password.value ||
      !this.confirmPassword.value
    )
    {
      this.hasError = true;
      this.errorMessage = 'Please fill out all the fields before continuing';
      return;
    }

    // Checking if the password and confirm password match
    if (this.password.value !== this.confirmPassword.value)
    {
      this.hasError = true;
      this.errorMessage = 'The passwords do not match';
      return;
    }

    // Sending an http request to create a user
    this.auth.signup(
      this.username.value,
      this.fullName.value,
      this.phoneNumber.value,
      this.password.value
    )
    .subscribe({
      next: (v) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.hasError = true;
        // this.errorMessage = 'Error creating account, please check your details'
        console.error(err.message);
      },
    });
  }
}
