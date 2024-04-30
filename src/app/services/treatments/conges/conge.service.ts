import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { EnvironmentsService } from '../../environments.service';


@Injectable({
    providedIn: 'root'
})
export class CongeService {

    
    public headers: any;

    constructor(
        private _localStorage: StorageManagerService,
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
    ) { }


    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }


    // send data conges
    saveDemandeConge = (data: any) => {
        const url = this._api_url.apiUrl + 'store_conge';

        return this._http.post(url, data, this.getToken());
    }
    // edit
    editDemandeConge = (slug: any) => {
        const url = this._api_url.apiUrl + 'edit_conge/' + slug;

        return this._http.get(url, this.getToken());
    }

    // edit
    updateDemandeConge = (slug: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_conge/' + slug;

        return this._http.post(url, data, this.getToken());
    }

    // delete
    deleteDemandeConge = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_conge/' + slug ;

        return this._http.get(url,  this.getToken());
    }


    // get data conges
    getCustomerConge = (employe_matricule: any) => {
        const url = this._api_url.apiUrl + 'customers_conge/' + employe_matricule;

        return this._http.get(url,  this.getToken());
    }


    // get data conges
    getConge = (employe_matricule: any) => {
        const url = this._api_url.apiUrl + 'get_conge/' + employe_matricule;

        return this._http.get(url,  this.getToken());
    }


    // get all conges data
    getAllConge = () => {
        const url = this._api_url.apiUrl + 'get_all_conge';

        return this._http.get(url,  this.getToken());
    }

    // approvedOrRejectedConge
    approvedOrRejectedConge = (data: any) => {
        const url = this._api_url.apiUrl + 'approved_or_rejected_conge';
        return this._http.post(url, data,  this.getToken());
    }

    // updateIsConsultingStatus
    updateIsConsultingStatus = (slug: string) => {
        const url = this._api_url.apiUrl + 'consulted_conge/' + slug;
        return this._http.get(url,  this.getToken());
    }


    // SHOW CONGE
    showConge = (slug: string) => {
        const url = this._api_url.apiUrl + 'edit_conge/' + slug;

        return this._http.get(url,  this.getToken());
    }

}
