import { Component, LOCALE_ID } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material-module';
import { QuoideneufLayoutModule } from './layouts/quoideneuf-layout/quoideneuf-layout.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { RedactionLayoutModule } from './layouts/redaction-layout/redaction-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import * as fr from '@angular/common/locales/fr';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MaterialModule,
        MatDialogClose,
        QuoideneufLayoutModule,
        AdminLayoutModule,
        RedactionLayoutModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        HttpClientModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'news_backoffice';


    constructor(
        private _router: Router,
        private _titleService: Title,
        private _activatedRoute: ActivatedRoute,
    ){
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
        ).subscribe(() => {

            let rt = this.getChild(this._activatedRoute)

            rt.data.subscribe((data: any) => {
                this._titleService.setTitle(data.title);
            })
        })
        //console.log("Blog layout on appCom ngOnInit")




    }


    getChild(activatedRoute: ActivatedRoute): any {
        if (activatedRoute.firstChild) {
            return this.getChild(activatedRoute.firstChild);
        } else {
            return activatedRoute;
        }

    }
}
