import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { AuthService } from '../../services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-redaction-layout',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
    ],
    templateUrl: './redaction-layout.component.html',
    styleUrl: './redaction-layout.component.css',
})
export class RedactionLayoutComponent implements OnInit {

    public sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/redaction"
        },
        {
            id: 2,
            label: 'Actualités',
            item_name: "Ecrire une dépêche",
            item_icon: "feed",
            router: "/redaction.create-depeche"
        },
        {
            id: 3,
            item_name: "Liste des dépêches",
            item_icon: "feed",
            router: "/redaction.depeche"
        },
        {
            id: 4,
            label: 'Flash',
            margin: 'mb-4',
            item_name: "Ecrire un flash",
            item_icon: "photo_library",
            router: "/redaction.create-flash"
        },
        {
            id: 5,
            item_name: "Liste des flashes",
            item_icon: "play_circle",
            router: "/redaction.flash"
        },
        {
            id: 6,
            label: 'Multimédia',
            margin: 'mb-4',
            item_name: "Liste des images",
            item_icon: "photo_library",
            router: "/redaction.liste-image"
        },
        {
            id: 7,
            item_name: "Liste des vidéos",
            item_icon: "play_circle",
            router: "/redaction.liste-media"
        },
        {
            id: 8,
            label: 'Administration',
            item_name: "Faire une demande",
            item_icon: "library_add",
            router: "/redaction.demande"
        },
        {
            id: 9,
            item_name: "Liste permissions",
            item_icon: "settings",
            router: "/redaction.liste-permissions"
        },
        {
            id: 10,
            item_name: "Liste des congés",
            item_icon: "settings",
            router: "/redaction.liste-conge"
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

                //console.log(this.current_route);
            }
        });
    }


    ngOnInit() {
        this.getUserConnectedData()

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

    back() {
        this._location.back();
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
