import { CreateProjectFormComponent } from './../components/create-project-form/create-project-form.component';
import { OpenProjectFormComponent } from './../components/open-project-form/open-project-form.component';
import {DeleteProjectFormComponent} from './../components/delete-project-form/delete-project-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {HomeComponent} from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
      SmartadminModule
  ],
  declarations: [HomeComponent, OpenProjectFormComponent, CreateProjectFormComponent,DeleteProjectFormComponent ]
})
export class HomeModule { }
