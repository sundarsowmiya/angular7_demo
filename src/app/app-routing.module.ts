import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardReportsComponent } from './dashboard/dashboard-reports/dashboard-reports.component';
import { ResourcesComponent } from './dashboard/resources/resources.component';
import { AddResourcesComponent } from './dashboard/resources/add-resources/add-resources.component';
import {NeedAuthGuard} from './auth.guard';
import {RoleGuard} from './role.guard';
//import { SuperRoleGuard } from './super.role.guard'
import { EditResourcesComponent } from './dashboard/resources/edit-resources/edit-resources.component';
import { DeleteResourcesComponent } from './dashboard/resources/delete-resources/delete-resources.component';

const routes: Routes = [ 
	{path:'login',component:LoginComponent},
	{path:"", redirectTo: '/login', pathMatch: 'full'},
	{path:"index", redirectTo: '/login', pathMatch: 'full'},
	{path:'dashboard', component:DashboardComponent,
	canActivate: [NeedAuthGuard, RoleGuard],
	children:[
		{path:'', component:DashboardReportsComponent},
		{ path:'resources', component: ResourcesComponent, 
		children:[
			{ path:'add-app', component:AddResourcesComponent },
			{path:'edit-resources/:id',component:EditResourcesComponent},
			{path:'delete-resources/:id',component:DeleteResourcesComponent}
		]},
	]},
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
