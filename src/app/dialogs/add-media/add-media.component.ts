import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { MainTreatmentsService } from '../../services/treatments/main-treatments.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';


@Component({
    selector: 'app-add-media',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './add-media.component.html',
    styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {

    public loading: boolean = false;

    public description: string = '';
    public list_type_media: any = [{type_media: 'audio'},{type_media: 'vidéo'}];
    public is_update: boolean = false;
    public item_slug: string = '';
    public media_file!: File;
    public old_image: string = '';
    public img_update: boolean = true;
    public type_media: any;
    public old_url_video: any;
    public urlVideo: string = '';
    public old_type_video: any = '';
    public old_file: any;
    public selectedTypeOption: any;

    constructor(
        private _traitement: MainTreatmentsService,
        private _message: NotificationService,
        private _user_connected: UserDataManagerService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddMediaComponent>,

    ) { }



    ngOnInit() {

        if (this.data != null) {

            console.log(this.data)
            if(this.data.type_media == 'audio'){
                this.old_file = this.data.audio_url;
                this.selectedTypeOption = this.data.type_media;
                this.description = this.data.description;
                this.item_slug = this.data.slug;
                this.is_update = true;
            }else{
                this.urlVideo = this.data.video_url;
                this.description = this.data.description;
                this.item_slug = this.data.slug;
                this.selectedTypeOption = this.data.type_media;
                this.is_update = true;
            }

        }
    }


    onChangeTypeMedia(event: any)
    {
        this.type_media = event.value;

    }

    isUpdateImg() {
        this.img_update = true;
    }


    uploadFile(e: any) {
        this.media_file = e.target.files[0];
    }

    saveMedia() {

        if (this.description == '') {
            this._message.openSnackBarSimpleError('La description est obligatoire')
            return
        }
        this.loading = true;


        if(this.type_media == 'audio'){

            const formData: FormData = new FormData();
            formData.append("description", this.description);
            formData.append("type_media", this.type_media == undefined?this.selectedTypeOption:this.type_media);
            formData.append("author", this._user_connected.getUserData().first_name + " " + this._user_connected.getUserData().last_name);
            formData.append("audio", this.media_file != undefined ? this.media_file : "");

            this._traitement.addMedia(formData).subscribe({

                next: (response: any) => {

                    if (response.code == 200) {
                        this._message.openSnackBarSuccess(response);
                        setTimeout(() => {
                            this._dialogRef.close(true)
                            this.type_media = '';
                            this.loading = false;
                        }, 1000);
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

        }else {

            const data = {
                description: this.description,
                type_media: this.type_media == undefined?this.selectedTypeOption:this.type_media,
                author: this._user_connected.getUserData().first_name + " " + this._user_connected.getUserData().last_name,
                video_url: this.urlVideo
            }

            this._traitement.addMedia(data).subscribe({

                next: (response: any) => {
                    console.log(response);
                    if (response.code == 200) {
                        this._message.openSnackBarSuccess(response);
                        setTimeout(() => {
                            this._dialogRef.close(true);
                            this.type_media = '';
                            this.loading = false;
                        }, 1000);
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
    }


    updateMedia() {

        this.loading = true;

        if(this.type_media == 'audio'){

            const formData: FormData = new FormData();
            formData.append("description",  this.description);
            formData.append("type_media", this.type_media == undefined?this.selectedTypeOption:this.type_media);
            formData.append("author", this._user_connected.getUserData().first_name + " " + this._user_connected.getUserData().last_name);
            formData.append("audio", this.media_file != undefined ? this.media_file : this.old_file);

            this._traitement.updateMedia(this.item_slug,formData ).subscribe({

                next: (response: any) => {

                    if (response.code == 200) {
                        this._message.openSnackBarSuccess(response);
                        setTimeout(() => {
                            this._dialogRef.close(true);
                            this.type_media = '';
                            this.loading = false;
                        }, 1000);
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

        }else {

            const data = {
                description: this.description,
                type_media: this.type_media == undefined?this.selectedTypeOption:this.type_media,
                author: this._user_connected.getUserData().first_name + " " + this._user_connected.getUserData().last_name,
                video_url: this.urlVideo
            }

            //console.log(data); return;
            this._traitement.updateMedia(this.item_slug, data ).subscribe({

                next: (response: any) => {

                    if (response.code == 200) {
                        this._message.openSnackBarSuccess(response);
                        setTimeout(() => {
                            this._dialogRef.close(true);
                            this.loading = false;
                        }, 1000);
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
    }


}
