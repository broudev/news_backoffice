import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainTreatmentsService } from '../../services/treatments/main-treatments.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-image',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './add-image.component.html',
    styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

    public loading: boolean = false;
    public galerie_libelle: string = '';
    public galerie_description: string = '';
    public galerie_image!: File;
    public list_galerie: any = [];
    public galerie_id: any
    public is_update: boolean = false;
    public itemId: any;
    public old_image: string = '';
    public img_update: boolean = true;


    constructor(
        private _traitement: MainTreatmentsService,
        private _message: NotificationService,
        private _user_connected: UserDataManagerService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddImageComponent>,

    ) { }


    ngOnInit() {

        if (this.data != null) {
            this.is_update = true;
            this.img_update = false;
            this.galerie_libelle = this.data.galerie_libelle;
            this.galerie_description = this.data.galerie_description;
            this.itemId = this.data.slug;
            this.old_image = this.data.galerie_img_url

        }
    }

    isUpdateImg() {
        this.img_update = true;
    }


    uploadFile(e: any) {
        this.galerie_image = e.target.files[0];
    }

    saveGalerie() {

        if (this.galerie_libelle == '') {
            this._message.openSnackBarSimpleError('Le libellé est obligatoire')
            return
        }
        this.loading = true;


        const formData: FormData = new FormData();
        formData.append("galerie_libelle", this.galerie_libelle);
        formData.append("galerie_description", this.galerie_description);
        formData.append("author", this._user_connected.getUserData().first_name + " " + this._user_connected.getUserData().last_name);
        formData.append("galerie_img", this.galerie_image != undefined ? this.galerie_image : "");

        this._traitement.addGalerie(formData).subscribe({

            next: (response: any) => {

                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this._dialogRef.close(true);
                        this.loading = false;
                    }, 4000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                    this.loading = false;
                    this._message.openSnackBarError(response);
                }
            },
            error:  (error: any) => {
                if(error.status == 401){
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();

                    this._router.navigateByUrl('/');

                }
            }


        })

    }


    updateGalerie() {

        this.loading = true;

        const formData: FormData = new FormData();
        formData.append("galerie_libelle", this.galerie_libelle);
        formData.append("galerie_description", this.galerie_description);
        formData.append("author", this._user_connected.getUserData().first_name + " " + this._user_connected.getUserData().last_name);
        formData.append("galerie_img", this.galerie_image == undefined ? "" : this.galerie_image );

        this._traitement.updateGalerie(this.itemId, formData).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    this._dialogRef.close(true);
                    this.loading = false;

                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                    this.loading = false;
                    this._message.openSnackBarError(response);
                }
            },
            error:  (error: any) => {
                if(error.status == 401){
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }

        });
    }




}
