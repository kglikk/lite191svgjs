import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { diagramRouting } from './diagram.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {DiagramComponent} from "./diagram.component";

import { ExternalGridFormComponent } from './../components/externalgrid-form/externalgrid-form.component';


@NgModule({
  imports: [
    CommonModule,
    diagramRouting,
      SmartadminModule,
      ReactiveFormsModule
  ],
  declarations: [DiagramComponent, ExternalGridFormComponent ]
})
export class DiagramModule { }
