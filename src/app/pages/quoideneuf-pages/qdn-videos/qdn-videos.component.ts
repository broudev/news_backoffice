import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { AddMediaComponent } from '../../../dialogs/add-media/add-media.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
    selector: 'app-qdn-videos',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
        YouTubePlayerModule
    ],
    templateUrl: './qdn-videos.component.html',
    styleUrl: './qdn-videos.component.css',
})
export class QdnVideosComponent implements OnInit {

    public media_list: any[] = [];

    public media_number: number = 0;
    public media_file!: File;
    public loading: boolean = false;

    public is_play: boolean = false;

    public player: any;
    public p: number = 1;
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();
    public key_word: string = '';
    public news_is_founded: number = 0;

    public search_query: string = "";


    constructor(
        private _main_treatment: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        private _message: NotificationService,
        private _dialogs: MatDialog,
        private _userData: UserDataManagerService
    ) { }


    ngOnInit() {

        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.getAllMedia();

        }, 2000);




    }


    getAllMedia() {
        this._main_treatment.getAllMedia().subscribe({

            next: (response: any) => {

                this.media_list = response;
                this.media_number = response.length;
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






    editGalerie(data: any) {

        const dialogRef = this._dialogs.open(AddMediaComponent, { width: 'auto', data: data });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getAllMedia();
                }
            },
        });

    }



    deleteGalerie(slug: string) {

        const dialogRef = this._dialogs.open(DeleteComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {
                    this._main_treatment.deleteMedia(slug).subscribe({

                        next: (response: any) => {
                            if (response.code == 200) {
                                this._message.openSnackBarSuccess(response);
                                this.getAllMedia();

                            } else if (response.code == 404) {
                                this._message.openSnackBarError(response);
                            }
                        },
                        error: (error: any) => {
                            if (error.status == 401) {
                                this._message.openSnackBarTokenExpired();
                                localStorage.clear();
                                this._router.navigateByUrl('/');

                            }
                        }


                    })
                }
            },
        });
    }



    filterMediaData() {
        //this.loading = true;
        const data = {
            date_debut: this.date_debut,
            date_fin: this.date_fin,
        }
        //console.log(data);
        //return ;

        this._main_treatment.filterMedia(data).subscribe({
            next: (response: any) => {
                this.media_list = response;
                this.news_is_founded = this.media_list.length;

                this.loading = false;
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        })

    }



    openMediaDialog() {

        const dialogRef = this._dialogs.open(AddMediaComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getAllMedia();
                }
            },
        });
    }

}
