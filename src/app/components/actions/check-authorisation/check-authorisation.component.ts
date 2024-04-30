import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';

@Component({
    selector: 'app-check-authorisation',
    templateUrl: './check-authorisation.component.html',
    styleUrls: ['./check-authorisation.component.css'],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    standalone: true,
})
export class CheckAuthorisationComponent implements OnInit {


    public authorization: any;

    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _dialogRef: MatDialogRef<CheckAuthorisationComponent>
    )
    {}

    ngOnInit(): void {

    }


    checkAuthorization(event: any)
    {
        console.log(event)
        this.is_loading = true;
        if(event == 0 || ''){
            this.is_loading = false;
            return
        }
        const data = {
            code: this.authorization
        }

        if(this.authorization.length >= 8)
        {
            this._traitement.checkCodeAuthorization(data).subscribe({

                next: (response: any) => {
                    //console.log(response);
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._notificationService.openSnackBarSuccess(response);
                            this._dialogRef.close(response);
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this.is_loading = false;
                        this.authorization = '';
                        this._notificationService.openSnackBarError(response);
                    }
                },
                error: (error: any) => {
                    if (error.status == 401) {
                        this._notificationService.openSnackBarTokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                    }
                }
            })
        }


    }
}
