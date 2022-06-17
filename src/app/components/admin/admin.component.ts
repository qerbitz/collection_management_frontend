import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  usersIdList: number[] = [];

  constructor(private adminService: AdminService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  public getUsersList() {
    this.adminService.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }



  public addUserToList(user_id): void {
    this.usersIdList.push(user_id);
    console.log(this.usersIdList);
  }


  public sendAdminRequest(request_type) {
    switch (request_type) {
      case 'lock': {
        this.adminService.blockUsers(this.usersIdList).subscribe({
          next: response => {
            this.getUsersList();
            this.usersIdList=[];
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
        );
        break;
      }

      case 'unlock': {
        this.adminService.unlockUsers(this.usersIdList).subscribe({
          next: response => {
            this.getUsersList();
            this.usersIdList=[];
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
        );
        break;
      }

      case 'delete': {
        this.adminService.deleteUsers(this.usersIdList).subscribe({
          next: response => {
            this.getUsersList();
            this.usersIdList=[];
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
        );
        break;
      }

      case 'upgrade': {
        this.adminService.upgradeToAdmin(this.usersIdList).subscribe({
          next: response => {
            this.getUsersList();
            this.usersIdList=[];
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
        );
        break;
      }

      case 'downgrade': {
        this.adminService.downgradeToUser(this.usersIdList).subscribe({
          next: response => {
            this.getUsersList();
            this.usersIdList=[];
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
        );
        break;
      }

      default: {
        break;
      }
    }
  }
}
