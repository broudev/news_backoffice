import { Routes } from '@angular/router';
import { Error404Component } from './pages/error-404/error-404.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RedactionLayoutComponent } from './layouts/redaction-layout/redaction-layout.component';
import { QuoideneufLayoutComponent } from './layouts/quoideneuf-layout/quoideneuf-layout.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "app.welcome",
        pathMatch: "full"
    },
    {
        path: "",
        component: AuthLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
            }
        ],
    },
    {
        path: "",
        //canActivate: [GuardsGuard],
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
            }
        ]
    }
    ,
    {
        path: "",
        //canActivate: [GuardsGuard],
        component: RedactionLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/redaction-layout/redaction-layout.module").then(m => m.RedactionLayoutModule)
            }
        ]
    }
    ,
    {
        path: "",
        //canActivate: [GuardsGuard],
        component: QuoideneufLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/quoideneuf-layout/quoideneuf-layout.module").then(m => m.QuoideneufLayoutModule)
            }
        ]
    }
    ,
    {
        path: "404-error",
        component: Error404Component
    },

    {
        path: "**",
        redirectTo: "404-error"
    }
];
