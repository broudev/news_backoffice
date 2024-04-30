import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoideneufWelcomeComponent } from '../../pages/quoideneuf-pages/quoideneuf-welcome/quoideneuf-welcome.component';
import { QdnNewsComponent } from '../../pages/quoideneuf-pages/qdn-news/qdn-news.component';
import { CreateQdnNewsFormsComponent } from '../../pages/quoideneuf-pages/qdn-news/create-qdn-news-forms/create-qdn-news-forms.component';
import { ViewQdnNewsDetailsComponent } from '../../pages/quoideneuf-pages/qdn-news/view-qdn-news-details/view-qdn-news-details.component';
import { EditQdnNewsFormsComponent } from '../../pages/quoideneuf-pages/qdn-news/edit-qdn-news-forms/edit-qdn-news-forms.component';
import { GalerieManagersComponent } from '../../pages/galerie-managers/galerie-managers.component';
import { QdnVideosComponent } from '../../pages/quoideneuf-pages/qdn-videos/qdn-videos.component';
import { MakeQdnRequestComponent } from '../../pages/quoideneuf-pages/make-qdn-request/make-qdn-request.component';
import { QdnPermissionsComponent } from '../../pages/quoideneuf-pages/qdn-permissions/qdn-permissions.component';
import { EditQdnPermissionsComponent } from '../../pages/quoideneuf-pages/qdn-permissions/edit-qdn-permissions/edit-qdn-permissions.component';
import { QdnLeavesComponent } from '../../pages/quoideneuf-pages/qdn-leaves/qdn-leaves.component';
import { EditQdnLeavesComponent } from '../../pages/quoideneuf-pages/qdn-leaves/edit-qdn-leaves/edit-qdn-leaves.component';
import { CustomersNewsListComponent } from '../../pages/quoideneuf-pages/customers-news-list/customers-news-list.component';
import { FullDemandesFormsComponent } from '../../components/customer-demandes/full-demandes-forms/full-demandes-forms.component';
import { CustomerListPermissionsComponent } from '../../components/customer-demandes/customer-list-permissions/customer-list-permissions.component';
import { FullEditPermissionsFormsComponent } from '../../components/customer-demandes/full-edit-permissions-forms/full-edit-permissions-forms.component';
import { CustomerListCongesComponent } from '../../components/customer-demandes/customer-list-conges/customer-list-conges.component';
import { FullEditCongesFormsComponent } from '../../components/customer-demandes/full-edit-conges-forms/full-edit-conges-forms.component';

const routes: Routes = [
    {
        path: 'quoideneufs',
        component: QuoideneufWelcomeComponent,
        data: {title: 'Accueil Quoideneuf'}
    },
    {
        path: 'quoideneufs.article',
        component: QdnNewsComponent,
        data: {title: 'Liste des articles'}
    },
    {
        path: 'quoideneufs.create-article',
        component: CreateQdnNewsFormsComponent,
        data: {title: 'Ecrire un article '}
    },
    {
        path: 'quoideneufs.view-article/:slug',
        component: ViewQdnNewsDetailsComponent,
        data: {title: 'Détail article'}
    },
    {
        path: 'quoideneufs.edit-article/:slug',
        component: EditQdnNewsFormsComponent,
        data: {title: 'Modification article'}
    },
    {
        path: 'quoideneufs.liste-image',
        component: GalerieManagersComponent,
        data: {title: 'Liste des images'}
    },
    {
        path: 'quoideneufs.liste-media',
        component: QdnVideosComponent,
        data: {title: 'Liste des médias'}
    },
    {
        path: 'quoideneufs.demande',
        component: FullDemandesFormsComponent,
        data: {title: 'Faire une demande'}
    },
    {
        path: 'quoideneufs.liste-permissions',
        component: CustomerListPermissionsComponent,
        data: {title: 'Liste des permissions '}
    },
    {
        path: 'quoideneufs.edit-permissions/:slug',
        component: FullEditPermissionsFormsComponent,
        data: {title: 'Modification de permission'}
    },
    {
        path: 'quoideneufs.liste-conge',
        component: CustomerListCongesComponent,
        data: {title: 'Liste des congés'}
    },
    {
        path: 'quoideneufs.edit-conge/:slug',
        component: FullEditCongesFormsComponent,
        data: {title: 'Modification de congé'}
    },
    {
        path: 'quoideneufs.customer-news',
        component: CustomersNewsListComponent,
        data: {title: 'Mes articles'}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuoideneufLayoutRoutingModule { }
