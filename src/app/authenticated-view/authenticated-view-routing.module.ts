import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TextComparisonComponent} from "./text-comparison/text-comparison.component";
import {ComparisonHistoryComponent} from "./comparison-history/comparison-history.component";
import {AuthenticatedViewComponent} from "./authenticated-view.component";
import {AuthGuard} from "../core/guards/auth.guard";


const routes: Routes = [
  {path: '', component: AuthenticatedViewComponent,canActivate: [AuthGuard], children: [
    {path: 'analyse-text', component: TextComparisonComponent, canActivate: [AuthGuard]},
    {path: 'comparison-history', component: ComparisonHistoryComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedViewRoutingModule { }
