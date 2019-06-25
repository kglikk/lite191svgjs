
import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";


export const routes:Routes = [

  {
    path: 'buses',
    loadChildren: 'app/+data/buses/buses.module#BusesModule',
    data: {pageTitle: 'Buses'}
  },

  {
    path: 'externalgrids',
    loadChildren: 'app/+data/externalgrids/externalgrids.module#ExternalGridsModule',
    data: {pageTitle: 'External Grids'}
  },
  {
    path: 'overheadlines',
    loadChildren: 'app/+data/overheadlines/overheadlines.module#OverheadLinesModule',
    data: {pageTitle: 'Overhead Lines'}
  },
  {
    path: 'twophasetransformers',
    loadChildren: 'app/+data/twophasetransformers/twophasetransformers.module#TwoPhaseTransformersModule',
    data: {pageTitle: 'Two Phase Transformers'}
  },

];


export const routing = RouterModule.forChild(routes)
