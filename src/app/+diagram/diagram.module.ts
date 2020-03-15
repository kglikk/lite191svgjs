import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { diagramRouting } from './diagram.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {DiagramComponent} from "./diagram.component";

import { ExternalGridFormComponent } from './../components/externalgrid-form/externalgrid-form.component';
import {LoadFormComponent} from './../components/load-form/load-form.component';
import {TwoPhaseTransformerFormComponent} from './../components/twophasetransformer-form/twophasetransformer-form.component';
 
   
@NgModule({
  imports: [
    CommonModule,
    diagramRouting,
      SmartadminModule,
      ReactiveFormsModule
  ],
  declarations: [DiagramComponent, ExternalGridFormComponent, LoadFormComponent, TwoPhaseTransformerFormComponent]
})
export class DiagramModule { }
