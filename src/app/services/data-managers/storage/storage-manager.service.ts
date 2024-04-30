import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class StorageManagerService {

    key: string = '1000scripts';
    constructor(
    ) { }


    setTokenToStorage (token: string) {

        let token_crypted = CryptoJS.AES.encrypt(token, this.key).toString()
        localStorage.setItem('Tookos', token_crypted); // Tookos= token keyword in localStorage
    }

    getTokenToStorage = () => {

        const token_crypted: any = localStorage.getItem('Tookos');

        if(token_crypted != null) {
            const token_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);
            return token_decrypted;
        }else {
            return
        }
    }

    setDataToStorage(data: string) {
        let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString()
        localStorage.setItem('Ramzan_Kadyrov', data_crypted);
    }


    getDataToStorage = () => {

        const data_crypted: any = localStorage.getItem('Ramzan_Kadyrov');

        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);

        return JSON.parse(data_decrypted);
    }


    setDemandeDataToStorage(data: any) {
        let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
        localStorage.setItem('Bil@Caiman', data_crypted);
    }

    getDemandeDataToStorage() {
        const data_crypted: any = localStorage.getItem('Bil@Caiman');
        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(data_decrypted);
    }




    setIsLoggedToStorage (data: string) {

        let data_crypted = CryptoJS.AES.encrypt(data, this.key).toString()
        localStorage.setItem('xyru_1OOX', data_crypted);
    }

    getIsLoggedToStorage = () => {

        const data_crypted: any = localStorage.getItem('xyru_1OOX');

        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);

        return data_decrypted;
    }

    checkTokenToStorage = () => {

        const data_crypted: any = localStorage.getItem('xyru_1OOX');
        if(data_crypted == undefined || data_crypted == "null") {
            return false;
        }else{
            const data_decrypted = this.getIsLoggedToStorage()
            if(data_decrypted == "true")
            {
                return true;
            }else {
                return false;
            }

        }
    }

}
