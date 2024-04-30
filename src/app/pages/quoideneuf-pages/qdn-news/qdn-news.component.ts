import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { QuoideneufTreatmentsService } from '../../../services/treatments/qdn/quoideneuf-treatments.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-qdn-news',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './qdn-news.component.html',
    styleUrl: './qdn-news.component.css',
})
export class QdnNewsComponent implements OnInit {

    public loading: boolean = false;

    public list_article: any[] = [];
    public article_number: number = 0;
    public item_deleted_id: any;
    public list_genre: any[] = [];
    public list_rubrique: any[] = [];
    public genre_id: any = [];
    public rubrique_id: any = [];
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();

    public news_is_founded: number = 0;

    public search_query: string = "";
    public p: number = 1;

    constructor(
        private _qdn_treatment: QuoideneufTreatmentsService,
        private _traitement: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        private _message: NotificationService,
        private _dialogs: MatDialog
    ) { }

    ngOnInit() {
        this._loadings.show_loading();

        setTimeout(() => {
            this.getAllArticle();
            this.getGenreJournaliste();
            this.getRubrique();
            this._loadings.hide_loading();
        }, 1000);

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

    getAllArticle() {

        this._qdn_treatment.getAllArticle().subscribe({

            next: (response: any) => {

                this.list_article = response.article;

                this.article_number = response.article_number;
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
        this._router.navigate(['/edit-article', slug]);
    }


    // DELETE article



    deleteArticle(slug: string) {

        const dialogRef = this._dialogs.open(DeleteComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {
                    this._qdn_treatment.deleteArticle(slug).subscribe({

                        next: (response: any) => {
                            if (response.code == 200) {
                                this._message.openSnackBarSuccess(response);
                                this.getAllArticle();

                            } else if (response.code == 404) {
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
            },
        });
    }



    // PUSH article

    pushArticle(slug: string) {

        this._qdn_treatment.pushArticle(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.getAllArticle();

                    }, 1000);
                } else if (response.code == 302 || response.code == 300 || response.code == 500) {

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
}
