import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { CommonModule } from '@angular/common';
import { MainTreatmentsService } from '../../services/treatments/main-treatments.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LoadingService } from '../../services/loadings/loading.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddImageComponent } from '../add-image/add-image.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-full-image-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ClipboardModule,
        MaterialModule,
        NgxSpinnerModule
    ],
    templateUrl: './full-image-dialog.component.html',
    styleUrl: './full-image-dialog.component.css',
})
export class FullImageDialogComponent implements OnInit {

    public media_url: string = '';
    public searchData: any = [];
    public _loading: boolean = false;
    public isSearching: boolean = false;

    constructor(
        private _traitement: MainTreatmentsService,
        private _loadings: LoadingService,
        private _message: NotificationService,
        private _dialogs: MatDialog,
        private _dialogRef: MatDialogRef<FullImageDialogComponent>,
    ){}

    ngOnInit(){

        this.getImageList();
    }

    onChooseImage(path: string)
    {
        this.media_url = path;
    }


    searchImage(event: any) {
        const query: string = event.target.value;

        if (query.length > 3) {
            this._loading = true
            setTimeout(() => {
                this._traitement.checkImage(query).subscribe((response: any) => {
                    this.searchData = response;
                    this.isSearching = true;
                });

                this._loading = false;
            }, 1000);

        } else {
            this.isSearching = false;
            this.getImageList();
            return
        }
    }


    onClipboardCopy(e: any) {
        const data = { message: "Lien de l'image copié avec succès", status: "success" }
        this._message.openSnackBarSuccess(data);
    }


    getImageList() {

        this._loadings.show_loading();
        this._traitement.getGalerieLimited().subscribe((response: any) => {

            setTimeout(() => {

                this.searchData = response;
                this._loadings.hide_loading();
            }, 1000);

            //console.log(response)
            //this.isSearching = true;
        });
    }


    openGalerieDialog() {

        const dialogRef = this._dialogs.open(AddImageComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getImageList();
                }
            },
        });
    }


    imagePathIsUsed() {

        this._dialogRef.close(this.media_url);
    }
}
