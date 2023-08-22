import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgbModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { AddReportComponent } from './component/add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { ViewComponentComponent } from './view-component/view-component.component';
import { OrderByPipe } from './order-by.pipe';
import {MatSelectModule} from '@angular/material/select';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExcelServicesService } from './service/excel-services.service';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupFormComponent,
    AddReportComponent,
    EditReportComponent,
    ViewComponentComponent,
    OrderByPipe,
    MultiSelectDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgSelectModule,
    PDFExportModule,
    NgbPaginationModule
  ],
  providers: [ExcelServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
