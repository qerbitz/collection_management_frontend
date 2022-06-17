import { Injectable } from '@angular/core'; 3
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  role: string;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
   }

    public login(username: string, password: string): Observable<User>{
    let user: User = new User;
    user.username = username;
    user.password = password;

    return this.httpClient.post(`${this.apiUrl}/user/login`, user).pipe(
      map(( userData: User) => {
          user.authdata = window.btoa(username + ':' + password);
          sessionStorage.setItem('username', username);

          if(userData.role=='ROLE_ADMIN'){
            sessionStorage.setItem('ROLE', "vw2jzzRZeD");
          }
          else{
            sessionStorage.setItem('ROLE', "Vmjox5Hpn4");
          }
          this.userSubject.next(user);
          return userData;
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
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
}
}
