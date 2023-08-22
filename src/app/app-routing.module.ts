import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddReportComponent } from './component/add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { ViewComponentComponent } from './view-component/view-component.component';

const routes: Routes = [
  {
    component:DashboardComponent,
    path:''
  },
  {
    component:AddReportComponent,
    path:'Add'
  },
  {
    component:EditReportComponent,
    path:'edit/:id'
  },
  {
    component:ViewComponentComponent,
    path:'view/:id'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
