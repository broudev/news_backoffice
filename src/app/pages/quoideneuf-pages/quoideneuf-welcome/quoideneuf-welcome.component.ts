import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { QuoideneufTreatmentsService } from '../../../services/treatments/qdn/quoideneuf-treatments.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../../../services/notifications/notification.service';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-quoideneuf-welcome',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './quoideneuf-welcome.component.html',
    styleUrl: './quoideneuf-welcome.component.css',
})
export class QuoideneufWelcomeComponent implements OnInit {

    public loading: boolean = false;
    public recente_article: any[] = [];
    public count_all_article: number = 0;
    public all_article: number = 0;

    public list_genre: any[] = [];
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

    constructor(
        private _qdn_treatment: QuoideneufTreatmentsService,
        private _traitement: MainTreatmentsService,
        private _sanitizer: DomSanitizer,
        private _loadings: LoadingService,
        private _router: Router,
        private _message: NotificationService,
    ) { }

    ngOnInit() {

        this._loadings.show_loading();
        setTimeout(() => {

            this.getRecenteArticle();
            this.getRecenteArticleStatistique();

            this.getGenreJournaliste();
            this.getRubrique();

            this._loadings.hide_loading();
        }, 2000);
    }


    onChange_genre(event: any)
    {
        this.genre_id = event.value;
    }
    onChange_rubrique(event: any)
    {
        this.rubrique_id = event.value;
    }

    getGenreJournaliste() {
        this._qdn_treatment.getGenreJournaliste().subscribe({

            next: (response: any) => {

                this.list_genre = response;
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
        this._qdn_treatment.getRubriqueQuoiDeNeuf().subscribe({

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

    getRecenteArticle() {

        this._qdn_treatment.getRecenteArticle().subscribe({

            next: (response: any) => {

                this.recente_article = response.article_quoi_de_neufs;

                this.all_article = response.article_number;
                this.article_ispublished = response.article_ispublished;
                this.article_nopublished = response.article_nopublished;
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



    getRecenteArticleStatistique() {
        this._qdn_treatment.getRecenteArticleStatistique().subscribe({

            next: (response: any) => {

                this.count_all_article = response;
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




    filterArticleData()
    {
        //this.loading = true;
        const data = {
            date_debut: this.date_debut,
            date_fin: this.date_fin,
            rubrique_id: this.rubrique_id,
            genre_id: this.genre_id
        }
        //console.log(data);
        //return ;

        this._traitement.filterOnNews(data).subscribe({
            next: (response: any) => {
                this.recente_article = response;

                this.news_is_founded = this.recente_article.length;
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
