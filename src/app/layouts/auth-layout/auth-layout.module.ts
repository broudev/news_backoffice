import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthLayoutRoutingModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AuthLayoutModule { }
