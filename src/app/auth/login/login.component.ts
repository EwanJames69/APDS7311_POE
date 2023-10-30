import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice: AuthServiceService, private router: Router) { }

  // This is the "quick & dirty" method, its not the best
  option: string = this.router.url

  ngOnInit(): void {    
  }

  onlogin(loginform: NgForm)
  {
    if (loginform.invalid)
    {
      return;
    }
  
    if (this.option == '/login') {
      this.authservice.login(loginform.value.enteredusername, loginform.value.enteredpassword)
    }
    else
    {
      this.authservice.signup(loginform.value.enteredusername, loginform.value.enteredpassword)
    }
  }

}
