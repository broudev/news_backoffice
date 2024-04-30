import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieManagerService } from '../../services/data-managers/cookies/cookie-manager.service';
import { StorageManagerService } from '../../services/data-managers/storage/storage-manager.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../../dialogs/users/forget-password/forget-password.component';

@Component({
    selector: 'app-auth-page',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {

    public _loading: boolean = false;
    public hide: boolean = true;

    //Login attribute
    public email: string = '';
    public password: string = '';


    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _dialog: MatDialog,
        private _cookieService: CookieManagerService,
        private _storageService: StorageManagerService,
        private _notificationService: NotificationService,
    ){}

    ngOnInit(): void {

    }


    async authentification() {

        this._loading = true;
        const data = {
            email: this.email,
            password: this.password
        }



        await this._authService.connectAdmin(data).subscribe({

            next: (response: any) => {
                
                //return
                if (response.code == 200) {

                    setTimeout(() => {

                        this._cookieService.setTokenToCookie(response.token);

                        this._cookieService.setEmailToCookie(response.users.email);

                        this._storageService.setTokenToStorage(response.token);

                        this._storageService.setDataToStorage(response.users);
                        this._storageService.setIsLoggedToStorage('true')

                        this._loading = false;


                        this._notificationService.openSnackBarSuccess(response);


                        this.redirectTo(response.users.role)

                    }, 1000)
                } else if (response.code == 302 || response.code == 300 || response.code == 500) {
                    this._notificationService.openSnackBarError(response);
                    this._loading = false;
                }

            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    window.location.reload();
                }
            }
        });

    }






    redirectTo(keywork: string)
    {
        //keyword: admin; redaction ; quoideneuf ; gestion_courier ; employe


        if(keywork == "admin"){
            this._router.navigate(['/admin'])
        }

        if(keywork == "quoideneuf"){
            this._router.navigate(['/quoideneufs'])
        }

        if(keywork == "redaction"){
            this._router.navigate(['/redaction'])
        }
    }



    openCheckAuthorizationDialog(enterAnimationDuration: string, exitAnimationDuration: string) {

        const dialogRef = this._dialog.open(ForgetPasswordComponent, {
            width: 'auto',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }
}
