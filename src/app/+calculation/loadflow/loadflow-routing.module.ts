import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadFlowComponent } from "app/+calculation/loadflow/loadflow.component";

const routes: Routes = [{
  path: '',
  component: LoadFlowComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadFlowRoutingModule { }
