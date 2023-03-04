import { Router } from '@angular/router';
import { LoginData } from './../../model/login-data';
import { UserList } from 'src/app/model/user-list';
import { apiConst } from '../../constants/api-url';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  public registerUser(userList: UserList): Observable<UserList>{
    return this.http.post<UserList>(`${environment.apiUrl}/${apiConst.AUTH_URL}/${apiConst.AUTH_ACTION_URL_REGISTER}`, userList);
  }

  public loginUser(userList: UserList): Observable<LoginData>{
    return this.http.post<LoginData>(`${environment.apiUrl}/${apiConst.AUTH_URL}/${apiConst.AUTH_ACTION_URL_LOGIN}`, userList);
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
