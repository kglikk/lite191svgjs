/**
 * Created by griga on 7/11/16.
 */
import { AuthGuard } from './services/auth/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';

import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/+home/home.module#HomeModule',
                data: {pageTitle: 'Home'}
            },
            {
                path: 'data',
                loadChildren: 'app/+data/data.module#DataModule',
                data: {pageTitle: 'Data'},
                canActivateChild: [AuthGuard],
              //  canActivate: [AuthGuard],
            },
            {
                path: 'calculation',
                loadChildren: 'app/+calculation/calculation.module#CalculationModule',
                data: {pageTitle: 'Calculation'},
                canActivateChild: [AuthGuard],
             //   canActivate: [AuthGuard]
            },
            {
                path: 'diagram',
                loadChildren: 'app/+diagram/diagram.module#DiagramModule',
                data: {pageTitle: 'Diagram'}
            },

        ]
    },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }, //jeśli żadna ścieżka nie działa (404 error) to prześlij do home

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false, enableTracing: false }); //  zmieniłem useHash na false, enabletracing tylko do debugowania