
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ExternalGridsRoutingModule } from './externalgrids-routing.module';
import { ExternalGridsComponent } from "app/+data/externalgrids/externalgrids.component";
import {SmartadminModule} from "app/shared/smartadmin.module";


import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([]),
    ExternalGridsRoutingModule
    
  ],
  declarations: [
    ExternalGridsComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class ExternalGridsModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
