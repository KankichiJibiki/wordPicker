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
  loginData = new LoginData();
  username: string | null = null;

  constructor(
    private http : HttpClient,
    private router: Router
  ) {
    this.username = localStorage.getItem(('userName'));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null;
  }

  public registerUser(userList: UserList): Observable<Response>{
    return this.http.post<Response>(`${environment.apiUrl}/${apiConst.AUTH_URL}/${apiConst.AUTH_ACTION_URL_REGISTER}`, userList);
  }

  public loginUser(userList: UserList): Observable<Response>{
    return this.http.post<Response>(`${environment.apiUrl}/${apiConst.AUTH_URL}/${apiConst.AUTH_ACTION_URL_LOGIN}`, userList);
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
