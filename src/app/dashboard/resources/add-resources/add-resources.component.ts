import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy,ChangeDetectorRef  } from '@angular/core';
import {Location} from '@angular/common';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup,FormArray , FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ResourcesService } from '../../../services/resources.service';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
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
  addResoucesForm: FormGroup;
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
  submitted = false;
   tData:any;
   value: Date;
   applicationNameList:any;
   applicationNames:any;
   applicationNameLists: [];
   departmentListes:Array<any>[];
   statusLists:Array<any>[];
   resourceClassLists:Array<any>[];
   locationCtryLists:Array<any>[];
   locationLists:Array<any>[];
   domainLists:Array<any>[];
   tredYearList:Array<any>[];
   genderLists:Array<any>[];
   roleLists:Array<any>[];
   retainLists :Array<any>[];
   cRTypeLists:Array<any>[];
   nextResTypeLists:Array<any>[];
   tredPeriodLists:Array<any>[];
   duplicateData = false;
   transitionYear;
   dropdownList = [];
 
   dropdownSettings = {};
   onItemSelected;
   onSelectedAll;
   items: Map<string, Array<any>>;
  

  constructor(
    private _location: Location, 
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private chgDt:ChangeDetectorRef,
    private resourcesService: ResourcesService) {
       this.addResoucesForm = this.fb.group({
         resourceID: ['', [Validators.required]],
         resourceName: ["",[Validators.required]],
         employmentType: ["",[Validators.required]],
         resourceClass: ["",[Validators.required]],
         city: ["",[Validators.required]],
         gender: ["",[Validators.required]],
         domain: ["",[Validators.required]],
         role: ["",[Validators.required]],

         applicationName:["",[Validators.required]],
         transitionYear:["",[Validators.required]],
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
        // applicationName: [, Validators.required]

    })
    
      this.resourceID = this.addResoucesForm.get('resourceID');
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
      this.transitionYear = this.addResoucesForm.get('transitionYear');
      this.remarks = this.addResoucesForm.get('remarks');
      this.dateOfHire = this.addResoucesForm.get('dateOfHire');
      this.country = this.addResoucesForm.get('country');
      this.administratorAccess = this.addResoucesForm.get('administratorAccess');
     
      }

    
  ngOnInit() {
      this.resourcesService.getDropDownlist().subscribe((response:any) =>{
      this.applicationNameLists =response[0].applicationNameList;
      this.departmentListes =response[0].departmentList;
      this.statusLists =response[0].statusList;
      this.resourceClassLists =response[0].resourceClassList;
      this.locationCtryLists =response[0].locationCtryList;
      this.locationLists =response[0].locationList;
      this.domainLists =response[0].domainList;
      this.genderLists =response[0].genderList;
      this.roleLists =response[0].roleList;
      this.retainLists =response[0].retainList;
      this.cRTypeLists =response[0].cRTypeList;
      this.nextResTypeLists =response[0].nextResTypeList;
      this.tredPeriodLists =response[0].tredPeriodList;
      this.tredYearList =response[0].tredYearList;
      this.chgDt.detectChanges();
    });
    this.dropdownList = [];
    this.applicationName = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

   
    
  }
  get f() { return this.addResoucesForm.controls; }
 backClicked() {
    this._location.back();
}

  dataDuplicate(DuplicateId){
   this.resourcesService.resoucesDuplicate(DuplicateId).subscribe(
      (response:any)=> {
      
        if(response.code == 'VR002')
            {
              this.duplicateData = true;
            }else{
              this.duplicateData = false;
            }
        },
      error => console.log(error,"error")
    )
  }




onItemSelect(items: any){

  console.log(this.applicationName,"All comming here");

 
}

  onSelectAll(items: any) {
    this.onSelectedAll = items;
  //  console.log(this.onSelectedAll);
  }
  
  addresouces(){  

    this.submitted = true;
 
     this.addResoucesForm.value.dateOfHire = new DatePipe('en-US').transform(this.addResoucesForm.value.dateOfHire, 'dd/MM/yyyy')
   
   // this.addResoucesForm.value.dateOfHire = this.addResoucesForm.value.dateOfHire.toLocaleDateString();
    if (this.addResoucesForm.invalid) {
      return;
  }
  console.log(this.addResoucesForm.value);
  this.resourcesService.addresouces(this.addResoucesForm.value).subscribe(
      (response:any)=> {
        this.closeModal();
        //this.fetchTableData();
       
        },
      error => console.log(error,"error")
    ) 
  }

  fetchTableData(){
    this.tData = true;
   }

private closeModal(): void {
  this.backClicked();
 // this.closeBtn.nativeElement.click();
  this.toastr.info('Record Created Sucessfully.');
  $('#datatable-buttons').DataTable().ajax.reload();
}



}
