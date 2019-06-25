import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoadFlowRoutingModule } from './loadflow-routing.module';
import { LoadFlowComponent } from "app/+calculation/loadflow/loadflow.component";
import {SmartadminModule} from "app/shared/smartadmin.module";
import {LoadFlowParametersFormComponent} from "app/components/load-flow-parameters-form/load-flow-parameters-form.component";

import {AgGridModule} from 'ag-grid-angular/main';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([]),
    LoadFlowRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    LoadFlowComponent,
    LoadFlowParametersFormComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class LoadFlowModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
