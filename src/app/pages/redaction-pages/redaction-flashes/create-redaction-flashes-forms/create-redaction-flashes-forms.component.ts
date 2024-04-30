import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { FormsModule } from '@angular/forms';
import { RedactionTreatmentsService } from '../../../../services/treatments/redactions/redaction-treatments.service';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-create-redaction-flashes-forms',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        FormsModule,
        NgxSpinnerModule
    ],
    templateUrl: './create-redaction-flashes-forms.component.html',
    styleUrl: './create-redaction-flashes-forms.component.css',
})
export class CreateRedactionFlashesFormsComponent implements OnInit {

    public contents: string = '';
    public loading: boolean = false;
    public list_rubrique: any[] = [];
    public list_pays: any[] = [];
    public rubrique_id!: number;
    public pays_id!: any;
    public current_slug: any;

    public selectedRubriqueOption: any;
    public selectedPaysOption: any;

    constructor(
        private _redaction_treatment: RedactionTreatmentsService,
        private _main_treatment: MainTreatmentsService,
        private _router: Router,
        private _loadings: LoadingService,
        private _message: NotificationService,
        private _userData: UserDataManagerService
    ) {}

    ngOnInit(): void {
        this.getRubrique();
        this.getPaysList();
    }

    onChange_rubrique(event: any) {
        this.rubrique_id = event.value;
    }
    onChange_pays(event: any) {
        this.pays_id = event.value;
    }

    transformToUpercase(event: string) {
        const contents = event;
        this.contents = contents.toUpperCase()
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

    addFlashes() {


        if (this.contents == '') {
            this._message.openSnackBarSimpleError('le message est obligatoire');
            return;
        }
        const flashData = {
            contents: this.contents,
            rubrique_id: this.rubrique_id,
            pays_id: this.pays_id,
            author: this._userData.getUserData().employe_matricule
        }

        this._loadings.show_loading();

        this._redaction_treatment.addFlash(flashData).subscribe({

            next: (response: any) =>{
                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.loading = false;
                        this._router.navigate([
                            '/redaction.view-flash',
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




}
