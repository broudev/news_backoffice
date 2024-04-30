import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { QuoideneufTreatmentsService } from '../../../../services/treatments/qdn/quoideneuf-treatments.service';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-view-qdn-news-details',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './view-qdn-news-details.component.html',
    styleUrl: './view-qdn-news-details.component.css',
})
export class ViewQdnNewsDetailsComponent implements OnInit {

    public current_slug: any = "";
    public articleData: any = {};
    public loading: boolean = false;
    public content: any = "";
    public lead: any = "";
    public title: any = "";

    constructor(
        private _qdn_treatment: QuoideneufTreatmentsService,
        private _traitement: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        private _message: NotificationService,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer : DomSanitizer
    ) { }

    ngOnInit() {

        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.getCurrentFlashInfo();
        }, 1000);

    }
    returnBack(): void {
        this._router.navigateByUrl('/quoideneufs.article')
    }

    getCurrentFlashInfo() {

        this.current_slug = this._activatedRoute.snapshot.paramMap.get('slug');

        let slug: string = this.current_slug.toString();

        this._qdn_treatment.getSingleArticle(slug).subscribe({

            next: (response: any) => {
                this.articleData = response;
                this.content = this._sanitizer.bypassSecurityTrustHtml(response.contenus);
                this.lead = response.lead;
                this.title = response.titre;
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

    editArticle(slug: string) {

        this._router.navigate(['/quoideneufs.edit-article', slug]);
    }

    pushArticle(slug: any) {

        this.loading = true;

        this._qdn_treatment.pushArticle(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.loading = false;
                        this._router.navigate(['/quoideneufs.article']);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300 || response.code == 500) {
                    this.loading = false;
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
