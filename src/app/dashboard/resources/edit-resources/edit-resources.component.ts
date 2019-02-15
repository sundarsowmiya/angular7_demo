import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResourcesService} from '../../../services/resources.service';
import { SharedService } from '../../../services/shared.service';
import * as config from '../../../../globalConfig';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpHeaders={
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}

// import { ResourcesComponent } from '../../../dashboard/resources/resources.component';
@Component({
  selector: 'app-edit-resources',
  templateUrl: './edit-resources.component.html',
  styleUrls: ['./edit-resources.component.css']
})
export class EditResourcesComponent implements OnInit {
  
  currentResources: any;
  public editResoucesForm:any;
  //public domain:any;
  
  public resourceID;
  currentUrl;
  // public resourceName:any;
  // applicationName;
  // gender;
  // employmentType;
  // retainRelease;
  // resourceClass;
  // dateOfHire;
  // role;
  // resourceManagerBankID;
  // resourceManagerName;
  // financialDepartment;
  // country;
  // city;
  // currentResourceType;
  // nextYearResourceType;
  // transitionPeriod;
  // remarks;
  // administratorAccess;

  // applicationNameList=['SG -Singapore','CH - Chennai','BG - Bangalore'];
  // departmentList=['Trde','Cash','Channels'];
  // Status=['Permanent','Vendor'];
  // resourceClassList=['Automation','Manual'];
  // locationCtryList=['KL -Kuala Lumpur','SG -Singapore','CH - Chennai','BG - Bangalore'];
  // locationList=['KL -Kuala Lumpur','SG -Singapore','CH - Chennai','BG - Bangalore'];
  // genderList=['Male', 'Female'];
  // domainList=['Trde','Cash','Channels'];
  // roleList=['Local','Foreigner'];
  // retainList=['Retain','Release'];
  // CRTypeList=['Functional','Automatione'];
  // nextResTypeList=['Functional','Automatione'];
  // tredPeriodList=[ 'Year','Quarter'];

  constructor(private _location: Location, 
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    sharedService:SharedService,
    private router: Router,
    private resourcesService: ResourcesService) { }
    backClicked() {
      this._location.back()
  }
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
       this.currentUrl = event.url;
       console.log(this.currentUrl);
      
      }
    });

    this.resourcesService.getResources(this.route.snapshot.params.id).subscribe((resources)=>{
      this.currentResources = resources;
      //this.currentResources = resources
      
    });
    //this.resourceID = this.editResoucesForm.get('resourceID').setValue(this.currentResources.resourceID);
   // console.log(this.currentResources.resourceID);
// this.editResoucesForm.get('resourceID').setValue(this.currentResources.resourceID);
    this.resourceID = this.fb.group({
      resourceID: [this.currentResources, Validators]
     // resourceID: [this.currentResources,Validators.minLength(22)],
      
         });


    this.editResoucesForm =this.fb.group({
       resourceID: ["",[Validators.required]], 
      //  resourceName: ["",[Validators.required]],
      //  domain: ["",[Validators.required]]
      //  employmentType: ["",[Validators.required]],
      //  resourceClass: ["",[Validators.required]],
      //  city: ["",[Validators.required]],
      //   gender: ["",[Validators.required]],
      
      //   role: ["",[Validators.required]],
      //  applicationName:["",[Validators.required]],
      //   retainRelease:["",[Validators.required]],
      //  resourceManagerBankID:["",[Validators.required]],
      //   financialDepartment:["",[Validators.required]],
      //  resourceManagerName:["",[Validators.required]],
      //   currentResourceType:["",[Validators.required]],
      //  nextYearResourceType:["",[Validators.required]], 
      //   transitionPeriod:["",[Validators.required]],
      //  remarks:["",[Validators.required]], 
      //  dateOfHire:["",[Validators.required]],
      //  country:["",[Validators.required]],
      //   administratorAccess:["",[Validators.required]],
    })
   

    // this.resourceID = this.editResoucesForm.get('resourceID').setValue(this.currentResources.resourceID);
    // this.resourceName = this.editResoucesForm.get('resourceName').setValue(this.currentResources.resourceName);
    // this.employmentType = this.editResoucesForm.get('employmentType').setValue(this.currentResources.employmentType);
    //  this.resourceClass = this.editResoucesForm.get('resourceClass').setValue(this.currentResources.resourceClass);
    // this.city = this.editResoucesForm.get('city').setValue(this.currentResources.city);
    //  this.gender = this.editResoucesForm.get('gender').setValue(this.currentResources.gender);
    // this.domain = this.editResoucesForm.get('domain').setValue(this.currentResources.domain);
    //  this.role = this.editResoucesForm.get('role').setValue(this.currentResources.role);
    // this.applicationName = this.editResoucesForm.get('applicationName').setValue(this.currentResources.applicationName);
    //  this.retainRelease = this.editResoucesForm.get('retainRelease').setValue(this.currentResources.retainRelease);
    // this.resourceManagerBankID = this.editResoucesForm.get('resourceManagerBankID').setValue(this.currentResources.resourceManagerBankID); 
    //  this.financialDepartment = this.editResoucesForm.get('financialDepartment').setValue(this.currentResources.financialDepartment);
    // this.resourceManagerName = this.editResoucesForm.get('resourceManagerName').setValue(this.currentResources.resourceManagerName); 
    // this.currentResourceType = this.editResoucesForm.get('currentResourceType').setValue(this.currentResources.currentResourceType);
    // this.nextYearResourceType = this.editResoucesForm.get('nextYearResourceType').setValue(this.currentResources.nextYearResourceType); 
    // this.transitionPeriod = this.editResoucesForm.get('transitionPeriod').setValue(this.currentResources.transitionPeriod);
    // this.remarks = this.editResoucesForm.get('remarks').setValue(this.currentResources.remarks); 
    // this.dateOfHire = this.editResoucesForm.get('dateOfHire').setValue(this.currentResources.dateOfHire);
    // this.country = this.editResoucesForm.get('country').setValue(this.currentResources.country);
    //  this.administratorAccess = this.editResoucesForm.get('administratorAccess').setValue(this.currentResources.administratorAccess);
  }


  editResoucesdata(){
   // console.log(this.route.snapshot.params.id);
    this.resourcesService.editResources(this.currentResources, this.route.snapshot.params.id).subscribe(
      response=> {
        
       
        //this.sharedService.changeData(true);        
        //this.backClicked();
      },
      error => console.log(error)
    )
  }

}
