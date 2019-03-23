import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResourcesService } from '../../../services/resources.service';
import { SharedService } from '../../../services/shared.service';
import * as config from '../../../../globalConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

// import { ResourcesComponent } from '../../../dashboard/resources/resources.component';
@Component({
  selector: 'app-edit-resources',
  templateUrl: './edit-resources.component.html',
  styleUrls: ['./edit-resources.component.css']
})
export class EditResourcesComponent implements OnInit {
  
  childmessage= false;
  currentResources: any;
   editResoucesForm: FormGroup;
   resourceID;
  currentUrl;
  resourceName:any;
  applicationName;
  gender;
  domain:string;
  ///domainList: string[]=['Trade','Cash','Channels'];
  employmentType;
  retainRelease;
  resourceClass;
  role;
  resourceManagerBankID;
  resourceManagerName;
  financialDepartment;
  country;
  city;
  currentResourceType;
  nextYearResourceType;
  transitionPeriod;
  transitionYear;
  remarks;
  administratorAccess;
  userId;
  dropDownlist;
  applicationNameList:Array<any>[];
   departmentList:Array<any>[];
   status:Array<any>[];
   resourceClassList:Array<any>[];
   locationCtryList:Array<any>[];
   locationList:Array<any>[];
   domainLists:Array<any>[];
   genderList:Array<any>[];
   roleList:Array<any>[];
   retainList :Array<any>[];
   cRTypeList:Array<any>[];
   nextResTypeList:Array<any>[];
   tredPeriodList:Array<any>[];
   tredYearList:Array<any>[];
   buttontype= false;
  constructor(private _location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private chgDt:ChangeDetectorRef,
    private resourcesService: ResourcesService,
    ) {
      
     }
   
  ngOnInit() {
   
  

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      //  console.log(this.currentUrl);
      }
    });
     this.editResoucesForm = this.fb.group({
        resourceID: [""],
        resourceName: [""],
        domain: ["",[Validators.required]],
       employmentType: ["",[Validators.required]],
       resourceClass: ["",[Validators.required]],
       city: ["",[Validators.required]],
        gender: ["",[Validators.required]],
        role: ["",[Validators.required]],
       applicationName:["",[Validators.required]],
        retainRelease:["",[Validators.required]],
       resourceManagerBankID:["",[Validators.required]],
        financialDepartment:["",[Validators.required]],
       resourceManagerName:["",[Validators.required]],
        currentResourceType:["",[Validators.required]],
       nextYearResourceType:["",[Validators.required]], 
        transitionPeriod:["",[Validators.required]],
        transitionYear:["",[Validators.required]],
       remarks:["",[Validators.required]], 
       dateOfHire:[""],
       country:["",[Validators.required]],
        administratorAccess:["",[Validators.required]],
        userId:["",[Validators]],
      
    })
    
    this.resourcesService.getResources(this.route.snapshot.params.id).subscribe((resources) => {
      this.seteditResoucesValue(resources);
     });
     
       this.resourcesService.getDropDownlist().subscribe((response:any) => {
        this.applicationNameList =response[0].applicationNameList;
        this.departmentList =response[0].departmentList;
        this.status =response[0].statusList;
        this.resourceClassList =response[0].resourceClassList;
        this.locationCtryList =response[0].locationCtryList;
        this.locationList =response[0].locationList;
        this.domainLists =response[0].domainList;
        this.genderList =response[0].genderList;
        this.roleList =response[0].roleList;
        this.retainList =response[0].retainList;
        this.cRTypeList =response[0].cRTypeList;
        this.nextResTypeList =response[0].nextResTypeList;
        this.tredPeriodList =response[0].tredPeriodList;
        this.tredYearList =response[0].tredYearList;
        this.chgDt.detectChanges();
        });
        let param1 = this.route.snapshot.queryParams["app"];
        if(param1 == "resourceDisabled")
        {
          this.editResoucesForm.disable();
          this.buttontype =false;
        }else{
          this.editResoucesForm.enable();
          this.buttontype =true;
        }
        
  }
  enableForm(){
    this.editResoucesForm.enable();
    this.buttontype =true;
  }
  get f() { return this.editResoucesForm.controls; }

  seteditResoucesValue(resources){  
   console.log(resources);
   this.editResoucesForm.controls['userId'].setValue(resources.userId);
   this.editResoucesForm.controls['resourceID'].setValue(resources.resourceID);
   this.editResoucesForm.controls['resourceName'].setValue(resources.resourceName);
   this.editResoucesForm.controls['domain'].setValue(resources.domain);
   this.editResoucesForm.controls['employmentType'].setValue(resources.employmentType);
   this.editResoucesForm.controls['resourceClass'].setValue(resources.resourceClass);
   this.editResoucesForm.controls['city'].setValue(resources.city);
   this.editResoucesForm.controls['gender'].setValue(resources.gender);
   this.editResoucesForm.controls['role'].setValue(resources.role);
   this.editResoucesForm.controls['applicationName'].setValue(resources.applicationName);
   this.editResoucesForm.controls['retainRelease'].setValue(resources.retainRelease);
   this.editResoucesForm.controls['resourceManagerBankID'].setValue(resources.resourceManagerBankID);
   this.editResoucesForm.controls['financialDepartment'].setValue(resources.financialDepartment);
   this.editResoucesForm.controls['resourceManagerName'].setValue(resources.resourceManagerName);
   this.editResoucesForm.controls['currentResourceType'].setValue(resources.currentResourceType);
   this.editResoucesForm.controls['nextYearResourceType'].setValue(resources.nextYearResourceType);
   this.editResoucesForm.controls['transitionPeriod'].setValue(resources.transitionPeriod);
   this.editResoucesForm.controls['transitionYear'].setValue(resources.transitionYear);
   this.editResoucesForm.controls['remarks'].setValue(resources.remarks);
   this.editResoucesForm.controls['dateOfHire'].setValue(resources.dateOfHire);
   this.editResoucesForm.controls['country'].setValue(resources.country);
   this.editResoucesForm.controls['administratorAccess'].setValue(resources.administratorAccess);

  }

  backClicked() {
    this._location.back()
  }
  editResoucesdata(f) {
   
   this.editResoucesForm.value.dateOfHire = new DatePipe('en-US').transform(this.editResoucesForm.value.dateOfHire, 'dd/MM/yyyy')
   console.log(this.editResoucesForm.value);
   let Form = JSON.stringify(this.editResoucesForm.value);
    this.resourcesService.editResources(Form).subscribe(
      (response:any)=> {
         //console.log(response.data);
        this.toastr.info('Record Updated Sucessfully.');
        $('#datatable-buttons').DataTable().ajax.reload();
         this.backClicked();
         },
      error => console.log(error)
    )
  }



}
