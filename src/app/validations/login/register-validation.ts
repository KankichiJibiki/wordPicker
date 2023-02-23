import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserList } from 'src/app/model/user-list';

@Injectable({
    providedIn: 'root'
})
export class RegisterValidations{
    userList = new UserList();
    regiForm: any;

    constructor(){
        this.regiForm = new FormGroup({
            username: new FormControl(this.userList.username, [
                Validators.required,
                Validators.maxLength(50),
            ]),
            email: new FormControl(this.userList.email, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(this.userList.password, [
                Validators.required,
                Validators.minLength(8),
            ])
        })
    }
}