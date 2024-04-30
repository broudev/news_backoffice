import { Injectable } from '@angular/core';
import { EnvironmentsService } from '../../environments.service';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';

@Injectable({
    providedIn: 'root',
})
export class QuoideneufTreatmentsService {

    public headers: any;

    constructor(
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
        private _localStorage: StorageManagerService,
    ) { }


    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }

    getGenreJournaliste = () => {
        const url = this._api_url.apiUrl + 'get_genre_journalistique';
        return this._http.get(url, this.getToken());
    }

    getAllArticle = () => {
        const url = this._api_url.apiUrl + 'get_articles';
        return this._http.get(url, this.getToken());
    }

    getSingleArticle = (param: string) => {
        const url = this._api_url.apiUrl + 'single_articles/'+ param;
        return this._http.get(url, this.getToken());
    }


    addArticle = (data: any) => {
        const url = this._api_url.apiUrl + 'add_articles';
        return this._http.post(url, data, this.getToken());
    }


    updateArticle = (slug: string, data: any) => {
        const url = this._api_url.apiUrl + 'update_articles/'+ slug;

        return this._http.post(url, data, this.getToken());
    }

    deleteArticle = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_articles'+'/'+ slug ;
        return this._http.get(url, this.getToken());
    }


    pushArticle = (slug: string) => {
        const url = this._api_url.apiUrl + 'push_article'+'/'+ slug;
        return this._http.get(url, this.getToken());
    }

    getRecenteArticle = () => {
        const url = this._api_url.apiUrl + 'get_recente_articles';
        return this._http.get(url, this.getToken());
    }


    getCustomerArticle = (customer: string) => {
        const url = this._api_url.apiUrl + 'get_customer_news/'+customer;
        return this._http.get(url, this.getToken());
    }


    getRecenteArticleStatistique = () => {
        const url = this._api_url.apiUrl + 'get_articles_hebdo_statistique';
        return this._http.get(url, this.getToken());
    }



    // RUBRIQUE QUOIDENEUF

    addRubriqueQuoiDeNeuf = (data: any) => {

        const url = this._api_url.apiUrl + 'add_rubrique_quoideneuf';

        return this._http.post(url, data, this.getToken());
    }

    getRubriqueQuoiDeNeuf = () => {
        const url = this._api_url.apiUrl + 'get_rubrique_quoideneuf';

        return this._http.get(url, this.getToken());
    }

    editRubriqueQuoiDeNeuf = (id: number) => {
        const url = this._api_url.apiUrl + 'edit_rubrique_quoideneuf/' + id;

        return this._http.get(url, this.getToken());
    }

    updateRubriqueQuoiDeNeuf = (id: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_rubrique_quoideneuf/' + id;
        return this._http.post(url, data, this.getToken());
    }

    deleteRubriqueQuoiDeNeuf = (id: number) => {
        const url = this._api_url.apiUrl + 'delete_rubrique_quoideneuf/' + id ;

        return this._http.get(url, this.getToken());
    }


    // GENRE LITERAIRE

    addGenreJournalistique = (data: any) => {
        const url = this._api_url.apiUrl + 'add_genre_journalistique';
        return this._http.post(url, data, this.getToken());
    }

    getGenreJournalistique = () => {
        const url = this._api_url.apiUrl + 'get_genre_journalistique';

        return this._http.get(url, this.getToken());
    }

    editGenreJournalistique = (id: number) => {
        const url = this._api_url.apiUrl + 'edit_genre_journalistique/' + id;
        return this._http.get(url, this.getToken());
    }

    updateGenreJournalistique = (id: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_genre_journalistique/' + id;
        return this._http.post(url, data, this.getToken());
    }

    deleteGenreJournalistique = (id: number, author: string) => {
        const url = this._api_url.apiUrl + 'delete_genre_journalistique/' + id + '/' + author;
        return this._http.get(url, this.getToken());
    }
}
