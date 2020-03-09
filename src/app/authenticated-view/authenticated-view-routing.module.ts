import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TextComparisonComponent} from "./text-comparison/text-comparison.component";
import {ComparisonHistoryComponent} from "./comparison-history/comparison-history.component";
import {AuthenticatedViewComponent} from "./authenticated-view.component";


const routes: Routes = [
  {path: '', component: AuthenticatedViewComponent, children: [
    {path: 'analyse-text', component: TextComparisonComponent},
    {path: 'comparison-history', component: ComparisonHistoryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedViewRoutingModule { }
