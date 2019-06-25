import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalGridsComponent } from "app/+data/externalgrids/externalgrids.component";

const routes: Routes = [{
  path: '',
  component: ExternalGridsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalGridsRoutingModule { }
