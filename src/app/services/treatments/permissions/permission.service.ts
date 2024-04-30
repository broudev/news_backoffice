import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { EnvironmentsService } from '../../environments.service';


@Injectable({
    providedIn: 'root'
})
export class PermissionService {

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
    demandePermissions = (data: any) => {
        const url = this._api_url.apiUrl + 'store_permission';
        return this._http.post(url, data, this.getToken());
    }

    // edit
    editDemandePermission = (slug: string) => {
        const url = this._api_url.apiUrl + 'edit_permission/' + slug;

        return this._http.get(url, this.getToken());
    }

    // SHOW PERMISSION
    showPermission = (slug: string) => {
        const url = this._api_url.apiUrl + 'edit_permission/' + slug;

        return this._http.get(url, this.getToken());
    }

    // updateDemandePermission
    updateDemandePermission = (slug: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_permission/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    // deleteDemandePermission
    deleteDemandePermission = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_permission/' + slug;

        return this._http.get(url, this.getToken());
    }



    // get customer permission
    getCustomerPermission = (employe_matricule: any) => {
        const url = this._api_url.apiUrl + 'customers_permissions/' + employe_matricule;
        return this._http.get(url, this.getToken());
    }

    // get  permission
    getPermission = (employe_matricule: any) => {
        const url = this._api_url.apiUrl + 'get_permissions/' + employe_matricule;
        return this._http.get(url, this.getToken());
    }



    // get all permission
    getAllPermission = () => {
        const url = this._api_url.apiUrl + 'get_all_permissions';
        return this._http.get(url, this.getToken());
    }
    // approvedOrRejectedPermission
    approvedOrRejectedPermission = (data: any) => {
        const url = this._api_url.apiUrl + 'approved_or_rejected_permission';
        return this._http.post(url, data, this.getToken());
    }

    // updateIsConsultingStatus
    updateIsConsultingStatus = (slug: string) => {
        const url = this._api_url.apiUrl + 'consulted_permission/' + slug;
        return this._http.get(url, this.getToken());
    }



}
