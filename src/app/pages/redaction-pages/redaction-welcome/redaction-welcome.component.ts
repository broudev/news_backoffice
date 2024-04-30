import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { RedactionTreatmentsService } from '../../../services/treatments/redactions/redaction-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';

@Component({
    selector: 'app-redaction-welcome',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './redaction-welcome.component.html',
    styleUrl: './redaction-welcome.component.css',
})
export class RedactionWelcomeComponent implements OnInit {

    public loading: boolean = false;
    public recente_depeche: any[] = [];
    public count_all_article: number = 0;
    public all_article: number = 0;

    public list_pays: any[] = [];
    public list_rubrique: any[] = [];

    public article_ispublished: number = 0;
    public article_nopublished: number = 0;

    // ****VARIABLE FILTER****//

    public genre_id: any = [];
    public rubrique_id: any = [];
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();

    public news_is_founded: number = 0;
    public p: number = 1;

    public count_all_depeche: number = 0;
    public all_depeche: number = 0;
    public count_all_depeche_from_ci: number = 0;
    public count_all_depeche_from_bf: number = 0;
    public count_all_depeche_from_ml: number = 0;

    public recente_flashes: any[] = [];
    public all_flashes: number = 0;
    public count_all_flash: number = 0;
    public count_all_flash_from_ci: number = 0;
    public count_all_flash_from_bf: number = 0;
    public count_all_flash_from_ml: number = 0;


    constructor(
        private _redaction_treatement: RedactionTreatmentsService,
        private _main_treatments: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        private _message: NotificationService,
        //private _dialogs: MatDialog,
        private _userData: UserDataManagerService
    ) { }

    ngOnInit() {

        this._loadings.show_loading();


        setTimeout(() => {

            this.getRecenteDepeche();
            this.getRecenteDepecheStatistique();
            this.getRecenteFlash();
            this.getRecenteFlashStatistique();

            this._loadings.hide_loading();
        }, 2000);
    }


    onChange_genre(event: any) {
        this.genre_id = event.value;
    }
    onChange_rubrique(event: any) {
        this.rubrique_id = event.value;
    }

    getPaysList() {
        this._main_treatments.getpays().subscribe({

            next: (response: any) => {

                this.list_pays = response;
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }

        });
    }

    getRubrique() {
        this._main_treatments.getRubrique().subscribe({

            next: (response: any) => {
                this.list_rubrique = response;
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }

        });
    }

    getRecenteDepeche()
    {
        this._redaction_treatement.getRecenteDepeche().subscribe({

            next: (response: any) => {

                this.recente_depeche = response.depeches;
                this.all_depeche = response.depeche_number;
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





    getRecenteDepecheStatistique()
    {
        this._redaction_treatement.getRecenteDepecheStatistique().subscribe({

            next: (response: any) => {
                //console.log(response);
                this.count_all_depeche = response.tout;
                this.count_all_depeche_from_ci = response.ci;
                this.count_all_depeche_from_bf = response.bf;
                this.count_all_depeche_from_ml = response.ml;
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


    // FLASH INFO

    getRecenteFlash()
    {
        this._redaction_treatement.getRecenteFlash().subscribe({

            next: (response: any) => {
                //console.log(response);
                this.recente_flashes = response.flash;
                this.all_flashes = response.flash_number;
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


    getRecenteFlashStatistique()
    {
        this._redaction_treatement.getRecenteFlashStatistique().subscribe({

            next: (response: any) => {
                //console.log(response);
                this.count_all_flash = response.tout;
                this.count_all_flash_from_ci = response.ci;
                this.count_all_flash_from_bf = response.bf;
                this.count_all_flash_from_ml = response.ml;
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




    filterArticleData() {
        //this.loading = true;
        const data = {
            date_debut: this.date_debut,
            date_fin: this.date_fin,
            rubrique_id: this.rubrique_id,
            genre_id: this.genre_id
        }
        //console.log(data);
        //return ;

        this._main_treatments.filterOnNews(data).subscribe({
            next: (response: any) => {
                this.recente_depeche = response;

                this.news_is_founded = this.recente_depeche.length;

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
}
