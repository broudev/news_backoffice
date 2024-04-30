import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { EditorConfig, NgxSimpleTextEditorModule, ST_BUTTONS } from 'ngx-simple-text-editor';
import { QuoideneufTreatmentsService } from '../../../../services/treatments/qdn/quoideneuf-treatments.service';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { FullImageDialogComponent } from '../../../../dialogs/full-image-dialog/full-image-dialog.component';

@Component({
    selector: 'app-edit-qdn-news-forms',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        NgxSimpleTextEditorModule,
        FormsModule,
    ],
    templateUrl: './edit-qdn-news-forms.component.html',
    styleUrl: './edit-qdn-news-forms.component.css',
})
export class EditQdnNewsFormsComponent implements OnInit {

    public contents: string = "";
    public title: string = "";
    public legend: string = "";
    public lead: string = "";
    public searchData: any[] = [];
    public isSearching: boolean = false;
    public loading: boolean = false;
    public list_genre: any[] = [];
    public list_rubrique: any[] = [];
    public list_pays: any[] = [];
    public genre_id!: number;
    public pays_id!: any;
    public rubrique_id!: number;
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();

    public media_url: string = "";
    public is_update_image: boolean = false;
    public rubrique_libelle: string = "";
    public genre_libelle: string = "";
    public item_slug: string = "";

    public selectedRubriqueOption: any;
    public selectedGenreOption: any;
    public selectedPaysOption: any;
    public current_slug: any;

    config: EditorConfig = {
        placeholder: 'Votre texte ici...',
        buttons: ST_BUTTONS,
    };

    constructor(
        private _qdn_treatment: QuoideneufTreatmentsService,
        private _main_treatment: MainTreatmentsService,
        private _router: Router,
        private _dialog: MatDialog,
        private _message: NotificationService,
        private _userData: UserDataManagerService,
        private _activatedRoute: ActivatedRoute,
    ){}

    ngOnInit(): void {
        this.current_slug = this._activatedRoute.snapshot.paramMap.get('slug');
        this.getGenreJournaliste();
        this.getRubrique();
        this.getPaysList();
        this.getCurrentNewsInfo();
    }


    onChange_genre(event: any) { this.genre_id = event.target.value; }
    onChange_rubrique(event: any) { this.rubrique_id = event.target.value; }
    onChange_pays(event: any) { this.pays_id = event.value; }


    onChooseImage(path: string)
    {
        this.media_url = path;
    }

    joinImage() {

        const dialogRef = this._dialog.open(FullImageDialogComponent, {
            panelClass: 'fullscreen-dialog',

        });

        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.media_url = val;
                }
            },
        });
    }

    show_file_input() {
        this.is_update_image = true;
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
            }

        });
    }
    getCurrentNewsInfo() {

        this._qdn_treatment.getSingleArticle(this.current_slug).subscribe({

            next: (response: any) => {
                console.log(response);
                this.contents = response.contenus;
                this.rubrique_libelle = response.rubrique;
                this.genre_libelle = response.genre;
                this.legend = response.legende;
                this.lead = response.lead;
                this.title = response.titre;
                this.selectedGenreOption = response.genre_id;
                this.selectedRubriqueOption = response.rubrique_id;
                this.selectedPaysOption = response.pays_id;
                this.media_url = response.media_url;
                this.item_slug = response.slug;
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




    updateArticle(slug: string) {
        this.loading = true;
        const data = {
            contenus: this.contents,
            genre_id: this.genre_id == undefined?this.selectedGenreOption:this.genre_id,
            rubrique_id: this.rubrique_id == undefined?this.selectedRubriqueOption:this.rubrique_id,
            pays_id: this.pays_id == undefined?this.selectedPaysOption:this.pays_id,
            media_url: this.media_url,
            titre: this.title,
            lead: this.lead,
            legende: this.legend,
        }


        //console.log(data, slug); return
        this._qdn_treatment.updateArticle(slug, data).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.loading = false;
                        this._router.navigate(['/quoideneufs.view-article', response.slug]);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300 || response.code == 500) {
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
