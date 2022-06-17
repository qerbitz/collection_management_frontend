import { Injectable } from '@angular/core'; 3
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public apiUrl = environment.apiUrl;
  

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) { }


  public getAllUsers(): Observable<User[]>{
    console.log(this.authenticationService.userValue);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test55' + ':' + 'test55') });
    return this.httpClient.get<User[]>(`${this.apiUrl}/admin/allUsers`,{ headers});
  }

  public blockUsers(usersIdList: number[]): Observable<number>{
    return this.httpClient.put<number>(`${this.apiUrl}/admin/blockUsers`, usersIdList);
  }

  public unlockUsers(usersIdList: number[]): Observable<number>{
    const user = this.authenticationService.userValue;
    const headers = new HttpHeaders({ Authorization: 'Basic '+ user.authdata});
    return this.httpClient.put<number>(`${this.apiUrl}/admin/unlockUsers`, usersIdList, {headers});
  }

  public deleteUsers(usersIdList: number[]): Observable<number>{
    return this.httpClient.post<number>(`${this.apiUrl}/admin/deleteUsers`, usersIdList);
  }

  public upgradeToAdmin(usersIdList: number[]): Observable<number>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test55' + ':' + 'test55') });
    return this.httpClient.put<number>(`${this.apiUrl}/admin/upgradeToAdmin`, usersIdList);
  }

  public downgradeToUser(usersIdList: number[]): Observable<number>{
    return this.httpClient.put<number>(`${this.apiUrl}/admin/downgradeToUser`, usersIdList);
  }
}
