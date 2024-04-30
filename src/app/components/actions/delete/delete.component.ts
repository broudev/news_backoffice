import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material-module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delete',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

    public order_code: any;

    constructor(
        private _dialogRef: MatDialogRef<DeleteComponent>,

    ) { }

    ngOnInit(): void {

    }

    confirm() {
        this._dialogRef.close('confirm');
    }

    cancel() {
        this._dialogRef.close('cancel');
    }


}
