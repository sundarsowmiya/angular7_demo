import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ResourcesService } from '../../../services/resources.service';
@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.css']
})
export class AddResourcesComponent implements OnInit {
  addResoucesForm;
  bankId;
  resourceName;
  businessTitle;
  department;
  Empstatus;
  ResourceSkill;
  location;
  gender;
  domain;
  nationality;
  applicationName;
  applicationNameList=['SG -Singapore','CH - Chennai','BG - Bangalore'];
  departmentList=['Trde','Cash','Channels'];
  Status=['Permanent','Vendor'];
  resourceskillList=['Automation','Manual','SME'];
   locationList=['KL -Kuala Lumpur','SG -Singapore','CH - Chennai','BG - Bangalore'];
   genderList=['Male', 'Female'];
   domainList=['Trde','Cash','Channels'];
   nationalityList=['Local','Foreigner'];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private resourcesService: ResourcesService) {

    this.addResoucesForm = fb.group({
      bankId: ["",[Validators.required]],
      resourceName: ["",[Validators.required]],
      businessTitle: ["",[Validators.required]],
      department: ["",[Validators.required]],
       Empstatus: ["",[Validators.required]],
       ResourceSkill: ["",[Validators.required]],
       location: ["",[Validators.required]],
       gender: ["",[Validators.required]],
       domain: ["",[Validators.required]],
       nationality: ["",[Validators.required]],
       applicationName:["",[Validators.required]],
    })

    this.bankId = this.addResoucesForm.get('bankId');
    this.resourceName = this.addResoucesForm.get('resourceName');
    this.businessTitle = this.addResoucesForm.get('businessTitle');
    this.department = this.addResoucesForm.get('department');
    this.Empstatus = this.addResoucesForm.get('Empstatus');
    this.ResourceSkill = this.addResoucesForm.get('ResourceSkill');
    this.location = this.addResoucesForm.get('location');
    this.gender = this.addResoucesForm.get('gender');
    this.domain = this.addResoucesForm.get('domain');
    this.nationality = this.addResoucesForm.get('nationality');
    this.applicationName = this.addResoucesForm.get('applicationName');
    
  }


  ngOnInit() {
  }

  addresouces(form){
    this.resourcesService.addresouces(this.addResoucesForm.value).subscribe(
      response=> {
       // this.onUpload();        
      },
      error => console.log(error,"error")
    )
  }


  
}
