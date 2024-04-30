import { Component, OnInit } from '@angular/core';
import { FullImageDialogComponent } from '../../../../dialogs/full-image-dialog/full-image-dialog.component';
import { EditorConfig, NgxSimpleTextEditorModule, ST_BUTTONS } from 'ngx-simple-text-editor';
import { RedactionTreatmentsService } from '../../../../services/treatments/redactions/redaction-treatments.service';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { QuoideneufTreatmentsService } from '../../../../services/treatments/qdn/quoideneuf-treatments.service';
import { MaterialModule } from '../../../../material-module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-redaction-news-forms',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        NgxSimpleTextEditorModule,
        FormsModule
    ],
    templateUrl: './create-redaction-news-forms.component.html',
    styleUrl: './create-redaction-news-forms.component.css',
})
export class CreateRedactionNewsFormsComponent implements OnInit {
    public contents: string = '';
    public title: string = '';
    public legend: string = '';
    public lead: string = '';
    public searchData: any[] = [];
    public isSearching: boolean = false;
    public loading: boolean = false;
    public list_genre: any[] = [];
    public list_rubrique: any[] = [];
    public list_pays: any[] = [];
    public genre_id!: number;
    public rubrique_id!: number;
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();
    public pays_id!: any;
    public media_url: string = '';

    config: EditorConfig = {
        placeholder: 'Votre texte ici...',
        buttons: ST_BUTTONS,
    };

    constructor(
        private _redaction_treatment: RedactionTreatmentsService,
        private _qdn_treatment: QuoideneufTreatmentsService,
        private _main_treatment: MainTreatmentsService,
        private _router: Router,
        private _dialog: MatDialog,
        private _message: NotificationService,
        private _userData: UserDataManagerService
    ) {}

    ngOnInit(): void {
        this.getGenreJournaliste();
        this.getRubrique();
        this.getPaysList();
    }

    onChange_genre(event: any) {
        this.genre_id = event.value;
    }
    onChange_rubrique(event: any) {
        this.rubrique_id = event.value;
    }
    onChange_pays(event: any) {
        this.pays_id = event.value;
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

    addArticle() {
        if (this.contents == '') {
            this._message.openSnackBarSimpleError('le contenu est obligatoire');
            return;
        }
        if (this.title == '') {
            this._message.openSnackBarSimpleError('Le titre est obligatoire');
            return;
        }
        if (this.lead == '') {
            this._message.openSnackBarSimpleError('Le lead est obligatoire');
            return;
        }
        if (this.media_url == '') {
            this._message.openSnackBarSimpleError("L'image est obligatoire");
            return;
        }
        if (this.rubrique_id == null || this.rubrique_id == undefined) {
            this._message.openSnackBarSimpleError(
                'La rubrique est obligatoire'
            );
            return;
        }
        if (this.genre_id == null || this.genre_id == undefined) {
            this._message.openSnackBarSimpleError(
                'Le genre journalistique est obligatoire'
            );
            return;
        }

        if (this.pays_id == null || this.pays_id == undefined) {
            this._message.openSnackBarSimpleError('Le pays est obligatoire');
            return;
        }

        this.loading = true;
        const data = {
            contenus: this.contents,
            genre_id: this.genre_id,
            pays_id: this.pays_id,
            rubrique_id: this.rubrique_id,
            media_url: this.media_url,
            titre: this.title,
            lead: this.lead,
            legende: this.legend,
            author:
                this._userData.getUserData().employe_matricule,
        };

        this._redaction_treatment.addDepeche(data).subscribe({
            next: (response: any) => {
                //console.log(response); return;
                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.loading = false;
                        this._router.navigate([
                            '/redaction.view-depeche',
                            response.slug,
                        ]);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._message.openSnackBarError(response);
                }
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
}
