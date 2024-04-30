import { Injectable } from '@angular/core';
import { EnvironmentsService } from '../environments.service';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../data-managers/storage/storage-manager.service';

@Injectable({
    providedIn: 'root',
})
export class MainTreatmentsService {
    public headers: any;

    constructor(
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
        private _localStorage: StorageManagerService
    ) { }


    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }

        //492507AI
    // FILTER ON NEWS

    filterOnNews = (data: any) => {
        const url = this._api_url.apiUrl + 'filter_on_news';
        return this._http.post(url, data, this.getToken());
    }

    filterOnDepecheNews = (data: any) => {
        const url = this._api_url.apiUrl + 'filter_depeche_on_news';
        return this._http.post(url, data, this.getToken());
    }

    filterOnFlashNews = (data: any) => {
        const url = this._api_url.apiUrl + 'filter_on_flash';
        return this._http.post(url, data, this.getToken());
    }


    filterMedia = (data: any) => {
        const url = this._api_url.apiUrl + 'filter_on_media';
        return this._http.post(url, data, this.getToken());
    }



    filterGalerie = (data: any) => {
        const url = this._api_url.apiUrl + 'filter_on_galerie'+'/'+data;
        return this._http.get(url, this.getToken());
    }



    customerNews = (data: any) => {
        const url = this._api_url.apiUrl + 'filter_on_galerie'+'/'+data;
        return this._http.get(url, this.getToken());
    }

    // COUNTRIE

    addPays = (formData: any) => {
        const url = this._api_url.apiUrl + 'add_pays';
        return this._http.post(url, formData, this.getToken());
    }

    getpays = () => {
        const url = this._api_url.apiUrl + 'get_pays';
        return this._http.get(url, this.getToken());
    }

    editPays = (id: number) => {
        const url = this._api_url.apiUrl + 'edit_pays/' + id;
        return this._http.get(url, this.getToken());
    }

    updatepays = (id: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_pays/' + id;
        return this._http.post(url, data, this.getToken());
    }

    deletePays = (id: number) => {
        const url = this._api_url.apiUrl + 'destroy_pays/' + id;
        return this._http.get(url, this.getToken());
    }



    // GALERIE

    addGalerie = (formData: any) => {
        const url = this._api_url.apiUrl + 'add_galerie';

        return this._http.post(url, formData, this.getToken());
    }

    getAllGalerie = () => {
        const url = this._api_url.apiUrl + 'get_galerie';

        return this._http.get(url, this.getToken());
    }
    getGalerieLimited = () => {
        const url = this._api_url.apiUrl + 'get_galerie_limited';

        return this._http.get(url, this.getToken());
    }

    editGalerie = (id: number) => {

        const url = this._api_url.apiUrl + 'edit_galerie/' + id;

        return this._http.get(url, this.getToken());
    }

    updateGalerie = (id: any, data: any) => {

        const url = this._api_url.apiUrl + 'update_galerie/' + id;
        return this._http.post(url, data, this.getToken());
    }

    deleteGalerie = (slug: string) => {

        const url = this._api_url.apiUrl + 'destroy_galerie/' + slug;

        return this._http.get(url, this.getToken());
    }


    checkImage(query: string) {

        const url = this._api_url.apiUrl + 'checked_img/' + query;

        return this._http.get(url, this.getToken());
    }


    // VIDEO

    addMedia = (formData: any) => {
        const token = this._localStorage.getTokenToStorage();
        const url = this._api_url.apiUrl + 'add_media';

        return this._http.post(url, formData, this.headers);
    }

    getAllMedia = () => {
        const url = this._api_url.apiUrl + 'get_media';

        const token = this._localStorage.getTokenToStorage();
        return this._http.get(url, this.headers);
    }

    getListeTypeMedia = () => {
        const url = this._api_url.apiUrl + 'get_type_media';

        const token = this._localStorage.getTokenToStorage();
        return this._http.get(url, this.headers);
    }



    updateMedia = (slug: string, data: any) => {

        const url = this._api_url.apiUrl + 'update_media/' + slug;
        return this._http.post(url, data, this.headers);
    }

    deleteMedia = (slug: string) => {

        const url = this._api_url.apiUrl + 'destroy_media/' + slug;
        return this._http.get(url, this.headers);
    }


    checkMedia(query: string) {

        const url = this._api_url.apiUrl + 'checked_img/' + query;
        return this._http.get(url, this.headers);
    }


    // TYPE CONGE

    getTypeConge = () => {
        const url = this._api_url.apiUrl + 'get_type_conge';
        return this._http.get(url,this.getToken());
    }

    getAllResponsable = () => {
        const url = this._api_url.apiUrl + 'get_all_responsable';
        return this._http.get(url,this.getToken());
    }


    // REDACTION RUBRIQUE

    addRubrique = (data: any) => {

        const url = this._api_url.apiUrl + 'add_rubrique';
        return this._http.post(url, data,this.getToken());
    }

    getRubrique = () => {
        const url = this._api_url.apiUrl + 'get_rubrique';
        return this._http.get(url,this.getToken());
    }


    editRubrique = (id: number) => {
        const url = this._api_url.apiUrl + 'edit_rubrique/' + id;

        return this._http.get(url,this.getToken());
    }

    updateRubrique = (id: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_rubrique/' + id;
        return this._http.post(url, data,this.getToken());
    }

    deleteRubrique = (id: number) => {
        const url = this._api_url.apiUrl + 'delete_rubrique/' + id ;
        return this._http.get(url,this.getToken());
    }


}
