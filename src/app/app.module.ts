import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
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
    AddResourcesComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
     BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
