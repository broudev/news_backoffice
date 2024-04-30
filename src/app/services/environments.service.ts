import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentsService {

    constructor() { }

    apiUrl: any = 'https://api-alerteinfo.alerteinfo-mairie.com/api/v1/';
}
