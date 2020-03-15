import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadsRoutingModule } from './loads-routing.module';
import { LoadsComponent } from "app/+data/loads/loads.component";
import {SmartadminModule} from "app/shared/smartadmin.module";

import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([]),
    LoadsRoutingModule
    
  ],
  declarations: [
    LoadsComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class LoadsModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
