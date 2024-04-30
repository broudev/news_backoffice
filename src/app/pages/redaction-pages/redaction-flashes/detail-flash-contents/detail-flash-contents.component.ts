import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material-module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RedactionTreatmentsService } from '../../../../services/treatments/redactions/redaction-treatments.service';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-detail-flash-contents',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        FormsModule,
        NgxSpinnerModule
    ],
    templateUrl: './detail-flash-contents.component.html',
    styleUrl: './detail-flash-contents.component.css',
})
export class DetailFlashContentsComponent implements OnInit {

    public contents: string = '';
    public loading: boolean = false;
    public current_slug: any;
    public rubrique_libelle: string = '';
    public pays_flag: string = '';

    constructor(
        private _redaction_treatment: RedactionTreatmentsService,
        private _main_treatment: MainTreatmentsService,
        private _router: Router,
        private _loadings: LoadingService,
        private _message: NotificationService,
        private _activatedRoute: ActivatedRoute
    ) {}


    ngOnInit(): void {
        this.current_slug = this._activatedRoute.snapshot.paramMap.get('slug');

        this.getCurrentFlashInfo();
    }

    transformToUpercase(event: string) {
        const contents = event;
        this.contents = contents.toUpperCase()
    }


    getCurrentFlashInfo() {

        this._loadings.show_loading();
        this._redaction_treatment
            .getSingleFlash(this.current_slug)
            .subscribe({
                next: (response: any) => {

                    setTimeout(() => {

                        this.contents = response.contenus;
                        this.rubrique_libelle = response.rubrique;
                        this.pays_flag = response.flag;

                        this._loadings.hide_loading();
                    }, 1000);
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
