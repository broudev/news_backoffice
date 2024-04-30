import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { RedactionTreatmentsService } from '../../../services/treatments/redactions/redaction-treatments.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';

@Component({
    selector: 'app-redaction-flashes',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './redaction-flashes.component.html',
    styleUrl: './redaction-flashes.component.css',
})
export class RedactionFlashesComponent implements OnInit {


    public loading: boolean = false;

    public list_flash: any[] = [];
    public flash_number: number = 0;
    public item_deleted_id: any;
    public list_rubrique: any[] = [];
    public list_genre: any[] = [];
    public list_pays: any[] = [];
    public rubrique_id: any = [];
    public pays_id: any = [];
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();

    public news_is_founded: number = 0;

    public search_query: string = "";
    public p: number = 1;



    constructor(
        private _redaction_treatment: RedactionTreatmentsService,
        private _main_treatment: MainTreatmentsService,
        private _router: Router,
        private _loadings: LoadingService,
        private _message: NotificationService,
        private _userData: UserDataManagerService
    ) {}



    ngOnInit(): void {

        this._loadings.show_loading();
        setTimeout(() => {

            this.getRubrique();
            this.getPaysList();
            this.getAllFlash();

            this._loadings.hide_loading();
        }, 1000);
    }

    onChange_rubrique(event: any) {
        this.rubrique_id = event.value;
    }
    onChange_pays(event: any) {
        this.pays_id = event.value;
    }



    getRubrique() {
        this._main_treatment.getRubrique().subscribe({

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

    getPaysList() {
        this._main_treatment.getpays().subscribe({
            next: (response: any) => {
                this.list_pays = response;
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }

    filterFlashData()
    {
        //this.loading = true;
        const data = {
            date_debut: this.date_debut,
            date_fin: this.date_fin,
            rubrique_id: this.rubrique_id,
            pays_id: this.pays_id
        }
        //console.log(data);
        //return ;

        this._main_treatment.filterOnFlashNews(data).subscribe({
            next: (response: any) => {
                //return;
                //console.log(response);
                this.list_flash = response;

                this.news_is_founded = this.list_flash.length;

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

    getAllFlash() {

        this._redaction_treatment.getAllFlashes().subscribe({

            next: (response: any) => {

                //console.log(response)
                this.list_flash = response;

                this.flash_number = response.flash_number;
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

    editarticle(slug: string) {
        this._router.navigate(['/redaction.edit-depeche', slug]);
    }


    // DELETE DEPECHE
    deleteFlash(slug: string) {
        this._redaction_treatment.deleteFlash(slug).subscribe({

            next: (response: any) => {

                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.getAllFlash();

                    }, 1000);
                } else if (response.code == 302) {
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

        });
    }

}
