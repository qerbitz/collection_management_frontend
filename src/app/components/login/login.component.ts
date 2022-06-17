import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  user: any;

  constructor(private authenticationService: AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
  }


  doLogin() {
    this.authenticationService.login(this.username, this.password).subscribe(
      data => {
        this.user = data;
        this.router.navigate(["/home"]);
      }
    );
  }

}
