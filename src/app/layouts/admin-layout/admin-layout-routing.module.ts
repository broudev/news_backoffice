import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminWelcomeComponent } from '../../pages/admin-pages/admin-welcome/admin-welcome.component';
import { EventsKeywordsComponent } from '../../pages/admin-pages/events-keywords/events-keywords.component';
import { CountriesComponent } from '../../pages/admin-pages/countries/countries.component';
import { QuoideneufRubriqueComponent } from '../../pages/admin-pages/rubriques/quoideneuf-rubrique/quoideneuf-rubrique.component';
import { RedactionRubriqueComponent } from '../../pages/admin-pages/rubriques/redaction-rubrique/redaction-rubrique.component';
import { BannersComponent } from '../../pages/admin-pages/banners/banners.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminWelcomeComponent,
        data: { title: 'Administration' },
    },
    {
        path: 'admin.events-key-words',
        component: EventsKeywordsComponent,
        data: { title: 'Evènements' },
    },
    {
        path: 'admin.country',
        component: CountriesComponent,
        data: { title: 'Pays' },
    },
    {
        path: 'admin.rubrique-quoideneuf',
        component: QuoideneufRubriqueComponent,
        data: { title: 'Rubrique quoideneuf' },
    },
    {
        path: 'admin.rubrique-redaction',
        component: RedactionRubriqueComponent,
        data: { title: 'Rubrique redaction' },
    },
    {
        path: 'web.admin.banners',
        component: BannersComponent,
        data: { title: 'Banners' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
