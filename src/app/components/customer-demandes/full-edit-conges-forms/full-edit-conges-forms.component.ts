import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CongeService } from '../../../services/treatments/conges/conge.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-full-edit-conges-forms',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        NgxSpinnerModule,

    ],
    templateUrl: './full-edit-conges-forms.component.html',
    styleUrl: './full-edit-conges-forms.component.css',
})
export class FullEditCongesFormsComponent implements OnInit {

    public list_type_responsable: any = [];

    public list_type_conge: any = [];

    public user_name: string = '';
    public user_fonction: string = '';
    public user_service: string = '';
    public employe_matricule: string = '';

    public motif: string = '';
    public type_conge: any;
    public objet_demande: string = '';

    public date_depart: Date = new Date() ;
    public date_retour: Date = new Date() ;

    public old_date_depart: any;
    public old_date_retour: any;

    public type_responsable: any;

    public selectedTypeCongeOption: any;

    public selectedTypeResponsableOption: any;


    public items_slug: string = '';


    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _loading: LoadingService,
        private _conge: CongeService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<FullEditCongesFormsComponent>,
    ){}

    ngOnInit(): void {

        this._loading.show_loading();

        if(this.data != null) {
            this.items_slug = this.data;
        }

        setTimeout(() => {

            this.getTypeCongeList();
            this.getAllResponsable();
            this.getCurrentCongeInfo();

            this._loading.hide_loading();
        }, 1000);
    }



    getCurrentCongeInfo()
    {
        this._conge.editDemandeConge(this.items_slug).subscribe({

            next: (response: any) => {
                //console.log(response);

                this.motif = response.motif;

                this.employe_matricule = response.employe_matricule;
                this.objet_demande = response.objet_demande;

                this.selectedTypeCongeOption = response.type_conge;
                this.selectedTypeResponsableOption = response.destinataire;

                this.date_depart = new Date(response.date_depart) ;
                this.date_retour = new Date(response.date_retour) ;

                this.motif = response.motif;

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



    getTypeCongeList() {

        this._traitement.getTypeConge().subscribe({

            next: (response: any) => {
                this.list_type_conge = response;
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


    getAllResponsable() {

        this._traitement.getAllResponsable().subscribe({
            next: (response: any) => {
                this.list_type_responsable = response
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


    updateConge() {


        let duree_jour = this.calculateDifferenceBetweenDates(this.date_depart, this.date_retour);


        //return
        const data = {

            date_depart: this.formatDate(this.date_depart).toString(),
            date_retour: this.formatDate(this.date_retour).toString(),
            type_conge: this.type_conge == undefined?this.selectedTypeCongeOption:this.type_conge,
            destinataire: this.type_responsable == undefined?this.selectedTypeResponsableOption:this.type_responsable,
            objet_demande: this.objet_demande,
            duree_conge: duree_jour,
            motif: this.motif,
            employe_matricule: this.employe_matricule
        }
        this._loading.show_loading();

        this._conge.updateDemandeConge(this.items_slug,data).subscribe({
            next: (response: any) => {

                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this._loading.hide_loading();
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
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
            },
        });
    }


    onChangeTypeConge(event: any) {
        this.type_conge = event.value

        this.objet_demande = "DEMANDE DE CONGES " + " " + this.type_conge
    }

    onChangeDestinataire(event: any) {
        this.type_responsable = event.value
    }

    // CALCULATE DATE DURATION
    calculateDifferenceBetweenDates(date1: any, date2: any): any {

        if (date1 != undefined && date2 != undefined) {
            let differenceEnMilliseconds = Math.abs(date2.getTime() - date1.getTime());
            let differenceEnJours = differenceEnMilliseconds / (1000 * 3600 * 24);

            return differenceEnJours + 'Jour(s)';
        } else {
            return undefined;
        }
    }


    formatDate(date: any) {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }

}
