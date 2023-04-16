import { AuthService } from './auth.service';
import { OverlayService } from './../overlay/overlay.service';
import { SpinnerService } from './../spinner/spinner.service';
import { Router } from '@angular/router';
import { DialogResult } from './../../views/components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { AppConfig } from './../../constants/appConfig';
import { DialogService } from './../dialog/dialog.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, lastValueFrom, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(
        private spinnerService: SpinnerService,
        private dialogService: DialogService,
        private router: Router,
        private overlayService: OverlayService,
        private authService: AuthService,
    ){}
    intercept(
            req: HttpRequest<unknown>, 
            next: HttpHandler
        ): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem('authToken');

        if(token){
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        }

        return next.handle(req).pipe(
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse){
                    switch(err.status){
                        case AppConfig.AUTH_ERROR : 
                            console.log(err.status);
                            this.handle401Error(req, next);
                            break;
                        case AppConfig.BAD_REQUEST:
                            console.log(err);
                            this.dialogService.openErrDialog(err.error.message);
                            break;
                        default: 
                            break;
                    }
                }
                this.spinnerService.stop();
                this.overlayService.disposeOverlay();
                return throwError("Error occured");
            })
        );
    }
    
    private async handle401Error(request: HttpRequest<any>, next: HttpHandler){
        const dialogRef = this.dialogService.openErrDialog('Please Login again');
        let res : DialogResult | undefined = await lastValueFrom(dialogRef.afterClosed());
        console.log(res);
        if(res) this.router.navigate(['login']);
    }
}