import { Injectable } from '@angular/core'; 3
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  role: string;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public login(username: string, password: string){
      let user: User = new User;
      user.username = username;
      user.password = password;

    return this.httpClient.post<any>(`${this.apiUrl}/user/login`, user)
      .pipe(map(user => {
        user.authdata = window.btoa(username + ':' + password);
        sessionStorage.setItem('username', JSON.stringify(user));
        sessionStorage.setItem('auth', window.btoa(username + ':' + password));

        if (user.role == 'ROLE_ADMIN') {
          sessionStorage.setItem('ROLE', "vw2jzzRZeD");
        }
        else {
          sessionStorage.setItem('ROLE', "Vmjox5Hpn4");
        }
        this.userSubject.next(user);
        return user;
      }
      )

      );
  }


  public get userValue(): User {
    return this.userSubject.value;
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/user/register`, user);
  }

  getRole() {
    this.role = sessionStorage.getItem('ROLE');
    return this.role;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
