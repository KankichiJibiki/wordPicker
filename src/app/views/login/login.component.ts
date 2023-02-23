import { SpinnerService } from './../../service/spinner/spinner.service';
import { RegisterValidations } from './../../validations/login/register-validation';
import { LoginValidations } from 'src/app/validations/login/login-validation';
import { LoginData } from './../../model/login-data';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { UserList } from 'src/app/model/user-list';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userList = new UserList();
  loginData = new LoginData();
  isLoginPage = true;
  authForm: any;

  constructor(
    private aService: AuthService,
    private router: Router,
    private loginV:  LoginValidations,
    private regiV: RegisterValidations ,
    public spinnerService: SpinnerService,
  ){
    this.authForm = this.isLoginPage ? this.loginV.loginForm : this.regiV.regiForm;
  }

  public login(){
    this.spinnerService.start();
    this.aService.loginUser(this.userList)
    .subscribe(
      (res: LoginData) => {
        localStorage.clear();
        alert("Login success");
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userId', res.id.toString());
        this.router.navigate(['/index']);
        this.spinnerService.stop();
      },
      (err: any) => {
        console.log(err);
        this.spinnerService.stop();
      }
    )
  }

  public register(){
    this.spinnerService.start();

    this.aService.registerUser(this.userList).subscribe(
      (res : UserList) => {
        alert('registered');
        this.togglePage();
        this.spinnerService.stop();
      },
      (err : any) => {
        alert(err.message);
        this.spinnerService.stop();
      }
    )
  }

  public togglePage(){
    this.isLoginPage = !this.isLoginPage;
    this.authForm = this.isLoginPage ? this.loginV.loginForm : this.regiV.regiForm;
  }
}
