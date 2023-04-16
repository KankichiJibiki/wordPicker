import { AuthService } from './../service/auth/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router,
    ){}

    public canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(!this.authService.isAuthenticated()) {
            console.log("Not Authorized");
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}