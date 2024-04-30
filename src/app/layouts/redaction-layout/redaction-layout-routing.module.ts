import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedactionWelcomeComponent } from '../../pages/redaction-pages/redaction-welcome/redaction-welcome.component';
import { GalerieManagersComponent } from '../../pages/galerie-managers/galerie-managers.component';
import { FullDemandesFormsComponent } from '../../components/customer-demandes/full-demandes-forms/full-demandes-forms.component';
import { CustomerListPermissionsComponent } from '../../components/customer-demandes/customer-list-permissions/customer-list-permissions.component';
import { FullEditPermissionsFormsComponent } from '../../components/customer-demandes/full-edit-permissions-forms/full-edit-permissions-forms.component';
import { CustomerListCongesComponent } from '../../components/customer-demandes/customer-list-conges/customer-list-conges.component';
import { FullEditCongesFormsComponent } from '../../components/customer-demandes/full-edit-conges-forms/full-edit-conges-forms.component';
import { RedactionCustomersNewsListComponent } from '../../pages/redaction-pages/redaction-customers-news-list/redaction-customers-news-list.component';
import { CreateRedactionFlashesFormsComponent } from '../../pages/redaction-pages/redaction-flashes/create-redaction-flashes-forms/create-redaction-flashes-forms.component';
import { RedactionFlashesComponent } from '../../pages/redaction-pages/redaction-flashes/redaction-flashes.component';
import { EditRedactionNewsFormsComponent } from '../../pages/redaction-pages/redaction-news/edit-redaction-news-forms/edit-redaction-news-forms.component';
import { ViewRedactionNewsComponent } from '../../pages/redaction-pages/redaction-news/view-redaction-news/view-redaction-news.component';
import { CreateRedactionNewsFormsComponent } from '../../pages/redaction-pages/redaction-news/create-redaction-news-forms/create-redaction-news-forms.component';
import { RedactionNewsComponent } from '../../pages/redaction-pages/redaction-news/redaction-news.component';
import { DetailFlashContentsComponent } from '../../pages/redaction-pages/redaction-flashes/detail-flash-contents/detail-flash-contents.component';

const routes: Routes = [
    {
        path: 'redaction',
        component: RedactionWelcomeComponent,
        data: {title: 'Rédaction'}
    },
    {
        path: 'redaction.depeche',
        component: RedactionNewsComponent,
        data: {title: 'Liste des dépêches'}
    },
    {
        path: 'redaction.create-depeche',
        component: CreateRedactionNewsFormsComponent,
        data: {title: 'Ecrire une dépêche'}
    },
    {
        path: 'redaction.view-depeche/:slug',
        component: ViewRedactionNewsComponent,
        data: {title: 'Détail dépêche'}
    },
    {
        path: 'redaction.edit-depeche/:slug',
        component: EditRedactionNewsFormsComponent,
        data: {title: 'Modification dépêche'}
    },
    {
        path: 'redaction.flash',
        component: RedactionFlashesComponent,
        data: {title: 'Liste des flashes'}
    },
    {
        path: 'redaction.create-flash',
        component: CreateRedactionFlashesFormsComponent,
        data: {title: 'Ecrire un flash'}
    },
    {
        path: 'redaction.view-flash/:slug',
        component: DetailFlashContentsComponent,
        data: {title: 'Détail flash'}
    },
    {
        path: 'redaction.liste-image',
        component: GalerieManagersComponent,
        data: {title: 'Liste des images'}
    },
    {
        path: 'redaction.demande',
        component: FullDemandesFormsComponent,
        data: {title: 'Faire une demande'}
    },
    {
        path: 'redaction.liste-permissions',
        component: CustomerListPermissionsComponent,
        data: {title: 'Liste des permissions'}
    },
    {
        path: 'redaction.edit-permission',
        component: FullEditPermissionsFormsComponent,
        data: {title: 'Modification de prermission'}
    },

    {
        path: 'redaction.liste-conge',
        component: CustomerListCongesComponent,
        data: {title: 'Liste des congés'}
    },
    {
        path: 'redaction.edit-conge',
        component: FullEditCongesFormsComponent,
        data: {title: 'Modification de congé'}
    },
    {
        path: 'redaction.customer-news',
        component: RedactionCustomersNewsListComponent,
        data: {title: 'Mes productions'}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RedactionLayoutRoutingModule {}
