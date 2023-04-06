import { lastValueFrom } from 'rxjs';
import { DialogResult } from './../components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { DialogService } from './../../service/dialog/dialog.service';
import { OverlayService } from './../../service/overlay/overlay.service';
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
    public aService: AuthService,
    private router: Router,
    private loginV:  LoginValidations,
    private regiV: RegisterValidations ,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private dialogService: DialogService,
  ){
    this.authForm = this.isLoginPage ? this.loginV.loginForm : this.regiV.regiForm;
  }

  public login(){
    this.overlayService.createOverlay();
    this.spinnerService.start();

    this.aService.loginUser(this.userList)
    .subscribe({
      next: (res: Response | any) => {
        this.spinnerService.start();
        localStorage.clear();
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('userId', res.data.id.toString());
        this.aService.isAuthorized = true;
        this.router.navigate(['/index']);
      },
      error: (err: any) => {

      },
      complete: () => {
        console.log("complete");
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
      }
    })
  }

  public register(){
    this.overlayService.createOverlay();
    this.spinnerService.start();

    this.aService.registerUser(this.userList).subscribe({
      next: async (res : Response | any) => {
        const dialogRef = this.dialogService.openYesOrNoDialog(res.message, false);
        let result : DialogResult | undefined = await lastValueFrom(dialogRef.afterClosed());
        this.togglePage();
        this.spinnerService.stop();
        this.router.navigate(['/']);
      },
      error: (err : any) => {

      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
      }
    })
  }

  public togglePage(){
    this.isLoginPage = !this.isLoginPage;
    this.authForm = this.isLoginPage ? this.loginV.loginForm : this.regiV.regiForm;
    this.userList = new UserList();
  }
}
