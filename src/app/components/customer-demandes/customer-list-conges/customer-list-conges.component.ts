import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailCongesComponent } from '../../../dialogs/customer-detail-demande-dialogs/customer-detail-conges/customer-detail-conges.component';
import { CongeService } from '../../../services/treatments/conges/conge.service';
import { DeleteComponent } from '../../actions/delete/delete.component';
import { FullEditCongesFormsComponent } from '../full-edit-conges-forms/full-edit-conges-forms.component';
import { TransformTextPipe } from '../../customer-pipe/text-transform/transform-text.pipe';
import { TransformDatePipe } from '../../customer-pipe/transform-date.pipe';

@Component({
    selector: 'app-customer-list-conges',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformTextPipe,
        TransformDatePipe,
        NgxSpinnerModule,
        NgxPaginationModule
    ],
    templateUrl: './customer-list-conges.component.html',
    styleUrl: './customer-list-conges.component.css',
})
export class CustomerListCongesComponent implements OnInit {

    public employe_matricule: string = "";

    public p: number = 1;

    public list_conges: any = [];
    public list_customer_conges: any = [];
    public conge_counter: number = 0;
    public customer_conge_counter: number = 0;


    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _loading: LoadingService,
        private _userData: UserDataManagerService,
        private _conge: CongeService,
        private _dialog: MatDialog,
    ){}


    ngOnInit(): void {
        this.employe_matricule = this._userData.getUserData().employe_matricule;

        this.getCustomerCongesList();
    }


    consulteCustomerConge(data: any) {
        const dialogRef = this._dialog.open(CustomerDetailCongesComponent,
            {
                panelClass: 'fullscreen-dialog',
                data: data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    //this.getAllGalerie();
                }
            },
        });
    }


    updateCustomerConge(data: any) {
        const dialogRef = this._dialog.open(FullEditCongesFormsComponent,
            {
                panelClass: 'fullscreen-dialog',
                data: data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCustomerCongesList();
                }
            },
        });
    }

    getCustomerCongesList() {

        this._loading.show_loading();
        this._conge.getCustomerConge(this.employe_matricule).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    console.log(response)
                    // customer conge
                    this.list_customer_conges = response;
                    this.customer_conge_counter = this.list_customer_conges.length;

                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        });
    }


    openDeleDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteConge(slug)

                }
            },
        });
    }


    deleteConge(slug: string) {
        this._loading.show_loading();

        this._conge.deleteDemandeConge(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getCustomerCongesList();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loading.hide_loading();
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
        });

    }
}
