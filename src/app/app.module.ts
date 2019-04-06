import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SideMenuComponent } from './dashboard/components/side-menu/side-menu.component';
import { HeaderNavComponent } from './dashboard/components/header-nav/header-nav.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { DashboardReportsComponent } from './dashboard/dashboard-reports/dashboard-reports.component';
import { ResourcesComponent } from './dashboard/resources/resources.component';
import { HttpClientModule }    from '@angular/common/http';
import { AddResourcesComponent } from './dashboard/resources/add-resources/add-resources.component';

import { ToastrModule } from 'ngx-toastr';
import { EditResourcesComponent } from './dashboard/resources/edit-resources/edit-resources.component';
import { DeleteResourcesComponent } from './dashboard/resources/delete-resources/delete-resources.component';
import {CalendarModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import { SpinnerComponent } from './dashboard/components/spinner/spinner.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ResourceDataComponent } from './dashboard/resource-data/resource-data.component';
import { ResourceNewDataComponent } from './dashboard/resource-new-data/resource-new-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideMenuComponent,
    HeaderNavComponent,
    SidebarComponent,
    ResourcesComponent,
    DashboardReportsComponent,
    AddResourcesComponent,
    EditResourcesComponent,
    DeleteResourcesComponent,
    SpinnerComponent,
    ResourceDataComponent,
    ResourceNewDataComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
     BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
   
    DropdownModule,
    //FileUploadModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
