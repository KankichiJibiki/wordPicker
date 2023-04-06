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
  isAuthorized: boolean = false;

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  public registerUser(userList: UserList): Observable<Response>{
    return this.http.post<Response>(`${environment.apiUrl}/${apiConst.AUTH_URL}/${apiConst.AUTH_ACTION_URL_REGISTER}`, userList);
  }

  public loginUser(userList: UserList): Observable<Response>{
    return this.http.post<Response>(`${environment.apiUrl}/${apiConst.AUTH_URL}/${apiConst.AUTH_ACTION_URL_LOGIN}`, userList);
  }

  public logout(){
    localStorage.clear();
    this.isAuthorized = false;
    this.router.navigate(['/']);
  }
}
