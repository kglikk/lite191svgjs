


import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { BusesRoutingModule } from './buses-routing.module';
import { BusesComponent } from './buses.component';

import {SmartadminModule} from "app/shared/smartadmin.module";


import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([]),
    BusesRoutingModule
    
  ],
  declarations: [
    BusesComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class BusesModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
