import { Injectable } from '@angular/core';
import { EnvironmentsService } from '../../environments.service';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';

@Injectable({
    providedIn: 'root',
})
export class RedactionTreatmentsService {


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

    // DEPECLE

    getAllDepeche = () => {
        const url = this._api_url.apiUrl + 'get_depeche';
        return this._http.get(url, this.getToken());
    }

    getSingleDepeche = (param: string) => {
        const url = this._api_url.apiUrl + 'single_depeche/'+ param;
        return this._http.get(url, this.getToken());
    }

    addDepeche = (data: any) => {
        const url = this._api_url.apiUrl + 'add_depeche';
        return this._http.post(url, data, this.getToken());
    }


    updateDepeche = (rfk: string, data: any) => {

        const url = this._api_url.apiUrl + 'update_depeche/'+ rfk;

        return this._http.post(url, data, this.getToken());
    }

    deleteDepeche = (slug: string) => {

        const url = this._api_url.apiUrl + 'destroy_depeche'+'/'+ slug ;
        return this._http.get(url, this.getToken());
    }


    pushDepeche = (id: number, author: string) => {

        const url = this._api_url.apiUrl + 'push_depeche'+'/'+ id + '/' + author;

        return this._http.get(url, this.getToken());
    }

    getRecenteDepeche = () => {
        const url = this._api_url.apiUrl + 'get_recente_depeche';

        return this._http.get(url, this.getToken());
    }


    getRecenteDepecheStatistique = () => {
        const url = this._api_url.apiUrl + 'get_depeche_hebdo_statistique';
        return this._http.get(url, this.getToken());
    }



    getRecenteFlash = () => {
        const url = this._api_url.apiUrl + 'get_recente_flash';
        return this._http.get(url, this.getToken());
    }


    getRecenteFlashStatistique = () => {
        const url = this._api_url.apiUrl + 'get_flash_hebdo_statistique';
        return this._http.get(url, this.getToken());
    }

    // FLASH

    getAllFlashes = () => {
        const url = this._api_url.apiUrl + 'get_flash';
        return this._http.get(url, this.getToken());
    }

    getSingleFlash = (param: string) => {
        const url = this._api_url.apiUrl + 'single_flash/'+ param;
        return this._http.get(url, this.getToken());
    }

    addFlash = (data: any) => {
        const url = this._api_url.apiUrl + 'add_flash';
        return this._http.post(url, data, this.getToken());
    }

    updateFlash = (rfk: string, data: any) => {
        const url = this._api_url.apiUrl + 'update_flash/'+ rfk;
        return this._http.post(url, data, this.getToken());
    }

    deleteFlash = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_flash'+'/'+ slug;
        return this._http.get(url, this.getToken());
    }
}
