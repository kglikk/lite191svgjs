import { Routes, RouterModule } from '@angular/router';
import {DiagramComponent} from "./diagram.component";
import {ModuleWithProviders} from "@angular/core";

export const diagramRoutes: Routes = [
    {
        path: '',
        component: DiagramComponent,
        data: {
            pageTitle: 'Diagram'
        }
    }
];

export const diagramRouting: ModuleWithProviders = RouterModule.forChild(diagramRoutes);

