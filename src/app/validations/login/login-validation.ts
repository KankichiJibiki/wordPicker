import { UserList } from 'src/app/model/user-list';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class LoginValidations{
    loginForm: any;
    userList = new UserList();

    constructor(){
        this.loginForm = new FormGroup({
            username: new FormControl(this.userList.username, [
                Validators.required,
                Validators.maxLength(50),
            ]),
            password: new FormControl(this.userList.password, [
                Validators.required,
                Validators.minLength(8),
            ])
        })
    };
}