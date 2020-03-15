import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadsComponent } from "app/+data/loads/loads.component";

const routes: Routes = [{
  path: '',
  component: LoadsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadsRoutingModule { }
