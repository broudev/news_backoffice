import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material-module';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MainTreatmentsService } from '../../services/treatments/main-treatments.service';
import { LoadingService } from '../../services/loadings/loading.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';
import { AddImageComponent } from '../../dialogs/add-image/add-image.component';
import { DeleteComponent } from '../../components/actions/delete/delete.component';

@Component({
    selector: 'app-galerie-managers',
    standalone: true,
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        RouterModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    templateUrl: './galerie-managers.component.html',
    styleUrl: './galerie-managers.component.css',
})
export class GalerieManagersComponent implements OnInit {

    public galerie_list: any[] = [];
    public galerie_number: number = 0;
    public galerie_image!: File;
    public loading: boolean = false;
    public old_image: string = '';
    public galerie_description: string = '';
    public is_update_image: boolean = false;
    public item_deleted_id: any;
    public galerie_libelle: string = '';
    public itemId: any;
    public p: number = 1;
    public date_debut: Date = new Date();
    public date_fin: Date = new Date();
    public key_word: string = '';
    public news_is_founded: number = 0;

    public search_query: string = "";

    public search_Control = new FormControl('');

    constructor(
        private _main_treatment: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        private _message: NotificationService,
        private _dialogs: MatDialog,
        private _userData: UserDataManagerService
    ) { }



    ngOnInit(): void {
        this._loadings.show_loading();

        setTimeout(() => {
            this.getAllGalerie();

            this._loadings.hide_loading();
        }, 1000);
    }


    getAllGalerie() {

        this._main_treatment.getAllGalerie().subscribe({

            next: (response: any) => {
                this.galerie_list = response;
                this.galerie_number = response.length;
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



    searchKeyWords(event: any) {

        const query: string = event.target.value;

        if (query.length > 3) {
            this.loading = true
            setTimeout(() => {
                this._main_treatment.filterGalerie(query).subscribe((response: any) => {
                    this.galerie_list = response;
                    //this.isSearching = true;
                });
                this.loading = false;
            }, 1000);

        } else {
            this.getAllGalerie();
        }
    }

    OnChange(e: any) {
        this.galerie_image = e.target.files[0];
    }

    uploadImg(f: NgForm) {
        if (f.invalid == true) {
            this._message.openSnackBarSimpleError('Les champs sont obligatoires')
            return
        }
        this.loading = true;


        const formData: FormData = new FormData();
        formData.append("galerie_libelle", f.value.imgTitle);
        formData.append("galerie_description", f.value.wordKey);
        formData.append("author", this._userData.getUserData().first_name);
        formData.append("galerie_img", this.galerie_image != undefined ? this.galerie_image : "");

        this._main_treatment.addGalerie(formData).subscribe({

            next: (response: any) => {

                if (response.code == 200) {
                    this._message.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.getAllGalerie();
                        f.reset();

                        this.loading = false;
                    }, 4000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
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


        })





    }



    editGalerie(data: any) {

        const dialogRef = this._dialogs.open(AddImageComponent, {width: 'auto',data: data});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getAllGalerie();
                }
            },
        });

    }





    deleteGalerie(slug: string) {

        const dialogRef = this._dialogs.open(DeleteComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {
                    this._main_treatment.deleteGalerie(slug).subscribe({

                        next: (response: any) => {
                            if (response.code == 200) {
                                this._message.openSnackBarSuccess(response);
                                this.getAllGalerie();

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



    filterArticleData()
    {
        //this.loading = true;
        const data = {
            date_debut: this.date_debut,
            date_fin: this.date_fin,
            key_words: this.key_word,
        }
        //console.log(data);
        //return ;

        this._main_treatment.filterOnNews(data).subscribe({
            next: (response: any) => {
                this.galerie_list = response;

                this.news_is_founded = this.galerie_list.length;


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



    openGalerieDialog() {

        const dialogRef = this._dialogs.open(AddImageComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getAllGalerie();
                }
            },
        });
    }

}
