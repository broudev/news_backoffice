import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-customer-detail-conges',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        NgxSpinnerModule,
    ],
    templateUrl: './customer-detail-conges.component.html',
    styleUrl: './customer-detail-conges.component.css',
})
export class CustomerDetailCongesComponent implements OnInit {

    public conge_data: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CustomerDetailCongesComponent>,
    ){}


    ngOnInit(): void {

        if (this.data != null) {
            this.conge_data = this.data;
        }
    }
}
