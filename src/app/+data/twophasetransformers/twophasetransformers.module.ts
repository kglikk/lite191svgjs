import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TwoPhaseTransformersRoutingModule } from './twophasetransformers-routing.module';
import { TwoPhaseTransformersComponent } from "app/+data/twophasetransformers/twophasetransformers.component";
import {SmartadminModule} from "app/shared/smartadmin.module";

import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([]),
    TwoPhaseTransformersRoutingModule
    
  ],
  declarations: [
    TwoPhaseTransformersComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class TwoPhaseTransformersModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
