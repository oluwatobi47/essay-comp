import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedViewRoutingModule } from './authenticated-view-routing.module';
import { AuthenticatedViewComponent } from './authenticated-view.component';
import { ComparisonHistoryComponent } from './comparison-history/comparison-history.component';
import { TextComparisonComponent } from './text-comparison/text-comparison.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AuthenticatedViewComponent, ComparisonHistoryComponent, TextComparisonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticatedViewRoutingModule
  ]
})
export class AuthenticatedViewModule { }
