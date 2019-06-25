
import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";


export const routes:Routes = [

  {
    path: 'loadflow',
    loadChildren: 'app/+calculation/loadflow/loadflow.module#LoadFlowModule',
    data: {pageTitle: 'Load Flow'}
  },
 

];


export const routing = RouterModule.forChild(routes)
