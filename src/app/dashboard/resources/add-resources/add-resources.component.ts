import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import {Location} from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ResourcesService } from '../../../services/resources.service';

@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddResourcesComponent implements OnInit {
  //  dateTime1: Date;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  modal;
  addResoucesForm;
  domain;
  resourceID;
  resourceName;
  applicationName;
  gender;
  employmentType;
  retainRelease;
  resourceClass;
  dateOfHire;
  role;
  resourceManagerBankID;
  resourceManagerName;
  financialDepartment;
  country;
  city;
  currentResourceType;
  nextYearResourceType;
  transitionPeriod;
  remarks;
  administratorAccess;
  IsmodelShow:any;
   applicationNameList=['SG -Singapore','CH - Chennai','BG - Bangalore'];
   departmentList=['Trade','Cash','Channels'];
   Status=['Permanent','Vendor'];
   resourceClassList=['Automation','Manual'];
   locationCtryList=['KL -Kuala Lumpur','SG -Singapore','CH - Chennai','BG - Bangalore'];
   locationList=['KL -Kuala Lumpur','SG -Singapore','CH - Chennai','BG - Bangalore'];
   genderList=['Male', 'Female'];
   domainList=['Trade','Cash','Channels'];
   roleList=['Local','Foreigner'];
   retainList=['Retain','Release'];
   CRTypeList=['Functional','Automatione'];
   nextResTypeList=['Functional','Automatione'];
   tredPeriodList=[ 'Year','Quarter'];
   tData:any;
  constructor(
    private _location: Location, 
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private resourcesService: ResourcesService) {

    this.addResoucesForm = fb.group({
      resourceID: ["",[Validators.required]],
       resourceName: ["",[Validators.required]],
       employmentType: ["",[Validators.required]],
       resourceClass: ["",[Validators.required]],
       city: ["",[Validators.required]],
       gender: ["",[Validators.required]],
       domain: ["",[Validators.required]],
       role: ["",[Validators.required]],
       applicationName:["",[Validators.required]],
       retainRelease:["",[Validators.required]],
       resourceManagerBankID:["",[Validators.required]],
       financialDepartment:["",[Validators.required]],
       resourceManagerName:["",[Validators.required]],
       currentResourceType:["",[Validators.required]],
       nextYearResourceType:["",[Validators.required]],
       transitionPeriod:["",[Validators.required]],
       remarks:["",[Validators.required]],
       dateOfHire:["",[Validators.required]],
       country:["",[Validators.required]],
       administratorAccess:["",[Validators.required]],
    })
  
    this.resourceID = this.addResoucesForm.get('resourceID');
    this.resourceName = this.addResoucesForm.get('resourceName');
    this.employmentType = this.addResoucesForm.get('employmentType');
    this.resourceClass = this.addResoucesForm.get('resourceClass');
    this.city = this.addResoucesForm.get('city');
    this.gender = this.addResoucesForm.get('gender');
    this.domain = this.addResoucesForm.get('domain');
    this.role = this.addResoucesForm.get('role');
    this.applicationName = this.addResoucesForm.get('applicationName');
    this.retainRelease = this.addResoucesForm.get('retainRelease');
    this.resourceManagerBankID = this.addResoucesForm.get('resourceManagerBankID');
    this.financialDepartment = this.addResoucesForm.get('financialDepartment');
    this.resourceManagerName = this.addResoucesForm.get('resourceManagerName');
    this.currentResourceType = this.addResoucesForm.get('currentResourceType');
    this.nextYearResourceType = this.addResoucesForm.get('nextYearResourceType');
    this.transitionPeriod = this.addResoucesForm.get('transitionPeriod');
    this.remarks = this.addResoucesForm.get('remarks');
    this.dateOfHire = this.addResoucesForm.get('dateOfHire');
    this.country = this.addResoucesForm.get('country');
    this.administratorAccess = this.addResoucesForm.get('administratorAccess');
  }


  ngOnInit() {
    
  }

  addresouces(form){
    
    this.addResoucesForm.value.dateOfHire = this.addResoucesForm.value.dateOfHire.toLocaleDateString();
console.log(this.addResoucesForm.value);
    this.resourcesService.addresouces(this.addResoucesForm.value).subscribe(
      (response:any)=> {
        this.closeModal();
        this.fetchTableData();
       this.backClicked();
        },
      error => console.log(error,"error")
    )
  }
  fetchTableData(){
    this.tData = true;
   }
  backClicked() {
    this._location.back();
    
}
private closeModal(): void {
  this.closeBtn.nativeElement.click();
  this.toastr.info('Record Created Sucessfully.');
  $('#datatable-buttons').DataTable().ajax.reload();
}



}
