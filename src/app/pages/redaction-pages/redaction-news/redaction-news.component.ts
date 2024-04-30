import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { RedactionTreatmentsService } from '../../../services/treatments/redactions/redaction-treatments.service';
import { QuoideneufTreatmentsService } from '../../../services/treatments/qdn/quoideneuf-treatments.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notifications/notification.service';

@Component({
    selector: 'app-redaction-news',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './redaction-news.component.html',
    styleUrl: './redaction-news.component.css',
})
export class RedactionNewsComponent implements OnInit {

    public loading: boolean = false;

    public list_article: any[] = [];
    public article_number: number = 0;
    public item_deleted_id: any;
    public list_rubrique: any[] = [];
    public list_genre: any[] = [];
    public list_pays: any[] = [];
    public genre_id: any = [];
    public rubrique_id: any = [];
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();

    public news_is_founded: number = 0;

    public search_query: string = "";
    public p: number = 1;


    constructor(
        private _redaction_treatment: RedactionTreatmentsService,
        private _qdn_treatment: QuoideneufTreatmentsService,
        private _main_treatment: MainTreatmentsService,
        private _router: Router,
        private _dialog: MatDialog,
        private _message: NotificationService,
    ) { }


    ngOnInit(): void {
        this.getGenreJournaliste();
        this.getRubrique();
        this.getPaysList();
        this.getAllDepeche();
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
            },
        });
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

        this._main_treatment.filterOnDepecheNews(data).subscribe({
            next: (response: any) => {
                //return;
                //console.log(response);
                this.list_article = response;

                this.news_is_founded = this.list_article.length;

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

    getAllDepeche() {

        this._redaction_treatment.getAllDepeche().subscribe({

            next: (response: any) => {
                console.log(response)
                this.list_article = response.depeche;

                this.article_number = response.depeche_number;
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
    deleteDepeche(slug: string) {
        this._redaction_treatment.deleteDepeche(slug).subscribe({

            next: (response: any) => {

                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.getAllDepeche();

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
