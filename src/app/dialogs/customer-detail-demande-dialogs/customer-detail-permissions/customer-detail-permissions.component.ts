import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-customer-detail-permissions',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        NgxSpinnerModule,
    ],
    templateUrl: './customer-detail-permissions.component.html',
    styleUrl: './customer-detail-permissions.component.css',
})
export class CustomerDetailPermissionsComponent implements OnInit {


    public permission_data: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CustomerDetailPermissionsComponent>,
    ){}

    ngOnInit(): void {

        if (this.data != null) {
            this.permission_data = this.data;
        }
    }
}
