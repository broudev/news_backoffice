import { StorageManagerService } from "../../services/data-managers/storage/storage-manager.service";

export class UserModels {

    first_name: string;
    last_name: string;
    photo: string;
    type_accounts: string;
    employe_matricule: string;
    role: string;


    constructor(
        first_name: string,
        last_name: string,
        photo: string,
        type_accounts: string,
        employee_matricule: string,
        role: string,
        
    ){

        this.first_name = first_name;
        this.last_name = last_name;
        this.photo = photo;
        this.employe_matricule = employee_matricule;
        this.role = role;
        this.type_accounts = type_accounts;
    }



}
