import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

    //Login attribute
    public email: string = '';
    public password: string = '';
    public hide: boolean = true;
    public is_loading: boolean = false;
    public is_user_account_founded: boolean = false;

    constructor(){}

    ngOnInit() {

    }


    checkUserAccounts() {
        this.is_user_account_founded = !this.is_user_account_founded;
    }

    switchNow() {
        this.is_user_account_founded = !this.is_user_account_founded;
    }


    updateUserPassword() {

    }


}
