import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }


  /*doLogin() {
    this.authenticationService.login(this.username, this.password).subscribe(
      data => {
        this.user = data;
        this.router.navigate(["/home"]);
      }
    );
  }*/


  doLogin() {
    this.authenticationService.login(this.username, this.password).subscribe(
      (response: HttpResponse<User>) =>{
       // data => {
        //  this.user = data;
          this.router.navigate(["/home"]);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        }
    );
  }


  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
