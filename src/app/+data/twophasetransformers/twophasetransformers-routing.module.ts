import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwoPhaseTransformersComponent } from "app/+data/twophasetransformers/twophasetransformers.component";

const routes: Routes = [{
  path: '',
  component: TwoPhaseTransformersComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoPhaseTransformersRoutingModule { }
