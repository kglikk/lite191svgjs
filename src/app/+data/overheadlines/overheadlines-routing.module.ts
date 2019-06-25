import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverheadLinesComponent } from "app/+data/overheadlines/overheadlines.component";

const routes: Routes = [{
  path: '',
  component: OverheadLinesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverheadLinesRoutingModule { }
