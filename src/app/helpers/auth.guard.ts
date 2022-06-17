import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';

import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isUserLoggedIn()) {
            const userRole = this.authenticationService.getRole();
            if (route.data.role && route.data.role.indexOf(userRole) === -1) {
              this.router.navigate(['/home']);
              return false;
            }
            return true;
        }



        this.router.navigate(['/login']);
        this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
        return false;
    }
}