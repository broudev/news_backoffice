import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { AuthService } from '../../services/auth/auth.service';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { UserModels } from '../../models/users/user-models';
import { Location } from '@angular/common';

@Component({
    selector: 'app-quoideneuf-layout',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,

    ],
    templateUrl: './quoideneuf-layout.component.html',
    styleUrl: './quoideneuf-layout.component.css'
})
export class QuoideneufLayoutComponent implements OnInit {

    public sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/quoideneufs"
        },
        {
            id: 2,
            label: 'Actualités',
            item_name: "Ecrire un article",
            item_icon: "feed",
            router: "/quoideneufs.create-article"
        },
        {
            id: 3,
            item_name: "Liste des articles",
            item_icon: "feed",
            router: "/quoideneufs.article"
        },
        {
            id: 4,
            label: 'Multimédia',
            margin: 'mb-4',
            item_name: "Liste des images",
            item_icon: "photo_library",
            router: "/quoideneufs.liste-image"
        },
        {
            id: 5,
            item_name: "Liste des vidéos",
            item_icon: "play_circle",
            router: "/quoideneufs.liste-media"
        },

        {
            id: 6,
            label: 'Administration',
            item_name: "Faire une demande",
            item_icon: "library_add",
            router: "/quoideneufs.demande"
        },
        {
            id: 7,
            item_name: "Liste permissions",
            item_icon: "settings",
            router: "/quoideneufs.liste-permissions"
        },
        {
            id: 8,
            item_name: "Liste des congés",
            item_icon: "settings",
            router: "/quoideneufs.liste-conge"
        }

    ];

    public user_name: string = '';
    public user_id: any;
    public user_photo: string = '';
    public user_role: string = '';
    public employe_matricule: string = '';
    public type_accounts: string = '';
    public screenWidth!: number;
    public current_route: string = '';

    constructor(
        private _userData: UserDataManagerService,
        private _message: NotificationService,
        private _auth: AuthService,
        private _router: Router,
        private _location: Location
    ) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.current_route = event.url;
            }
        });

    }

    ngOnInit() {
        this.getUserConnectedData()

    }

    back() {
        this._location.back();
    }






    getUserConnectedData() {
        let data = this._userData.getUserData();
        this.user_name = data.first_name;
        this.user_photo = data.photo;
        this.user_role = data.role;
        this.employe_matricule = data.employe_matricule;
        this.type_accounts = data.type_accounts

            //console.log(this.user_role)
    }


    logOut() {

        this._auth.logOut(this.user_id).subscribe({

            next: (response: any) =>{

                if(response.code == 200){

                    sessionStorage.clear();
                    localStorage.clear();

                    this._message.openSnackBarSuccess(response);

                    this._router.navigate(['/']);

                }
            },
            error: (error: any) => {

                if (error.status == 401) {
                    this._message.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    window.location.reload();
                }
            }
        })

    }
}
