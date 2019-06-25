import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OverheadLinesRoutingModule } from './overheadlines-routing.module';
import { OverheadLinesComponent } from "app/+data/overheadlines/overheadlines.component";
import {SmartadminModule} from "app/shared/smartadmin.module";

import {AgGridModule} from 'ag-grid-angular/main';
import { ChildMessageRenderer } from './child-message-renderer.component';
import { SelectLineTypeFormComponent } from '../../components/select-line-type-form/select-line-type-form.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SmartadminModule,
    AgGridModule.withComponents([ChildMessageRenderer]),
    OverheadLinesRoutingModule,
    ReactiveFormsModule
    //AgGridModule.withComponents([ChildMessageRenderer]),
    
  ],
  declarations: [
    OverheadLinesComponent,
    ChildMessageRenderer,
    SelectLineTypeFormComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ] 
})
export class OverheadLinesModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
