import { 
  Component, 
  OnInit, 
  ViewChild,
  AfterViewInit, 
  Renderer, 
  OnDestroy,
  ElementRef,
  Output, EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation } from '@angular/core';
  import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import * as config from '../../../globalConfig';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { ResourcesService } from '../../services/resources.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTable } from 'primeng/primeng';

const httpHeaders={
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css',],
  encapsulation: ViewEncapsulation.None
})
export class ResourcesComponent implements  OnInit, AfterViewInit{
 // @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
 @ViewChild(DataTableDirective)
 datatableElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};

  @ViewChild('closeBtn') closeBtn: ElementRef;
  titleHeading = 'Resources';
  selectedFile;
 // dtOptions: DataTables.Settings = {};
  // dtElement: DataTableDirective;
  // dtInstance:DataTableDirective;
  uploadFileData;
  uploadResoucesForm:FormGroup;
  searchResoucesForm:FormGroup;
  // dtTrigger;
  dropDownlist:any;;
  uploadedFiles: any[] = [];
  spinnerFlag;
  isDisabled = true
  changeText: boolean;

  applicationNameLists: [];
  applicationName;
  dropdownList = [];
  dropdownSettings = {};
  onItemSelected;
  onSelectedAll;

  domaindropdownSettings = {};
  domainNameLists: [];
  domainName;
  onSelectedAlldoamin;

  resourcesdropdownSettings = {};
  resourcesNameLists: [];
  resourcesid;
  onSelectedAllresourcesid;
   constructor(private route: ActivatedRoute,
      
    private router: Router,
    private renderer: Renderer,
    private sharedService: SharedService,
    private http: HttpClient,
    private fb: FormBuilder,
    private chgDt:ChangeDetectorRef,
    private resourcesService:ResourcesService,
    private toastr: ToastrService) {
      this.changeText = false;
      this.uploadResoucesForm = fb.group({
        uploadFileData: ["",[Validators.required]],
      });
      this.uploadFileData = this.uploadResoucesForm.get('uploadFileData');

      this.searchResoucesForm = fb.group({
        applicationName: ["",[Validators.required]],
        domainName: ["",[Validators.required]],
        resourcesid: ["",[Validators.required]],
      });
      this.applicationName = this.searchResoucesForm.get('applicationName');
      this.domainName = this.searchResoucesForm.get('domainName');
      this.resourcesid = this.searchResoucesForm.get('resourcesid');
     }
     
  ngOnInit() {
    this.resourcesService.getDropDownlist().subscribe((response:any) =>{
      this.applicationNameLists =response[0].applicationNameList;
      this.domainNameLists = response[0].domainList;

    });
    this.resourcesService.getResourcesall().subscribe((response:any) =>{
      this.resourcesNameLists = response.map(res => res.resourceID)
   
       });

      //  this.renderDatatable('','','');
    
    this.sharedService.currentData.subscribe((data) => {
      if(data){
        console.log(data, "Service change");
      }
    }) 
    
    this.dtOptions = {
      ajax: {
        "url": "http://10.23.213.157:8888/users?appName=&resourceId=&domain=&_=1554307516305",
        "dataSrc": function (json) {
          console.log(json);
          let myJson = {
            data: []
          };
          myJson.data.push(json)
          return myJson.data[0];
        }
      },
      columns: [
        { title: 'Domain', data: 'domain' },
        { title: 'Resource Name', data: 'resourceName' },
      {
        title: 'Resource ID',
        data: null,
        render: function (data, type, row) {
          return `<a resource-editDisable-id="` + data.resourceID + `"  data-toggle="modal"  data-target="#full-width-modal" class="btn btn-link" style="text-decoration: underline;" > ` + data.resourceID + `</a>`;
        }
      },
     
      {
        title: 'Application Name',
        data: null,
        render: function (data, type, row) {
          var arrayLength = data.applicationName;

          var mul;

          if (arrayLength.length === 1) {
            mul = data.applicationName;
          } else {

            mul = `<div class="tooltipss" >Multiple Application <span class="tooltiptext" >` + data.applicationName + `</span> </div>`;
          }
          return mul;

        }

      },

      { title: 'Employment Type', data: 'employmentType' }, { title: 'Retain / Release', data: 'retainRelease' },
      { title: 'Resource Class', data: 'resourceClass' }, { title: 'Date Of Hire', data: 'dateOfHire' },
      { title: 'Role', data: 'role' }, { title: 'Resource Manager Bank ID', data: 'resourceManagerBankID' },
      { title: 'Resource Manager Name', data: 'resourceManagerName' }, {
        title: 'Financial Department', data: 'financialDepartment'
      }, { title: 'Location Country', data: 'city' }, { title: 'Location City', data: 'country' },
      { title: 'Current Resource Type (2018)', data: 'currentResourceType' }, {
        title: 'Next year Resource Type', data: 'nextYearResourceType'
      }, { title: 'Transition Period', data: 'transitionPeriod' }, {
        title: 'Transition Year', data: 'transitionYear'
      }, { title: 'Remarks', data: 'remarks' }, { title: 'Administrator Access', data: 'administratorAccess' },
      {
        title: 'Option',
        data: null,
        className: "thead-light",
        render: function (data, type, row) {
          return `<a resource-edit-id="` + data.resourceID + `" data-toggle="modal"  data-target="#full-width-modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
          <a resource-delete-id="`+ data.resourceID + `" data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>`;
        }
      }
      ]
      
    };



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

    this.domainName = [];
    this.domaindropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.resourcesid = [];
    this.resourcesdropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
//this.dtOptions=null;


  }


  onItemSelect(items: any){
    console.log(items);
    //this.renderDatatable('items','','');
  }
  onSelectAll(items: any) {
    this.onSelectedAll = items;
  }


  domainonItemSelect(items: any){
    console.log(this.domainName,"All comming here doamin name");
 }
 domainonSelectAll(items: any) {
   this.onSelectedAlldoamin = items;
 }

  resourcesItemSelect(items: any){
    console.log(this.resourcesid,"All comming here doamin name");
  }
  resourcesonSelectAll(items: any) {
  this.onSelectedAllresourcesid = items;
  }



 searchresouces(){
  console.log(this.searchResoucesForm.value);
 //this.ngOnInit();
  // this.renderDatatable('','','');
  
 }

  downloadtable():void {
    this.resourcesService.getResourcesall().subscribe((resources) => {
      this.resourcesService.exportAsExcelFile(resources, 'resourcesDetails');
     });
 }

 onUploadChanged(event) {
  this.isDisabled = false
  this.selectedFile = event.target.files[0]; 
}

uploadData() {
 this.spinnerFlag = true;
 const uploadFileData = new FormData();
 uploadFileData.append('uploadFileData', this.selectedFile, this.selectedFile.name);  
   
  this.resourcesService.uploadDocument(uploadFileData).subscribe(
    (response:any)=> {
    this.spinnerFlag = false;
    $('#datatable-buttons').DataTable().ajax.reload();;
    this.uploadResoucesForm.reset();
    this.closeModal();
    this.toastr.info(response.message);
    },
    error => {this.spinnerFlag = false; this.toastr.error(error);}
  )
}

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("resource-edit-id")){
        this.router.navigate(["dashboard/resources/edit-resources/"+ event.target.getAttribute("resource-edit-id")], {queryParams:{app:"resource"}});
      }if(event.target.hasAttribute("resource-delete-id")) {
        this.router.navigate(["dashboard/resources/delete-resources/"+ event.target.getAttribute("resource-delete-id")], {queryParams:{app:"resource"}});
      } if (event.target.hasAttribute("resource-editDisable-id")){
        this.router.navigate(["dashboard/resources/edit-resources/"+ event.target.getAttribute("resource-editDisable-id")], {queryParams:{app:"resourceDisabled"}});
      }
    });

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
    
  }

 

// renderDatatable(appName,resourceId,domain){
    
//     this.dtOptions = {
//       "processing": true,
//         "serverSide": true,
//       ajax:{
//         "url": config.gServiceUrl+"/users?appName="+appName+"&resourceId="+resourceId+"&domain="+domain+"",
//         "dataSrc":function ( json ) {
//           console.log(json);
//           let myJson = {
//             data:[]
//           };
          
//           myJson.data.push(json)
//           return myJson.data[0];
//         }
        
//       }, 
//       columns: [{title: 'Domain', data: 'domain'},
//       { title: 'Resource ID',
//       data: null, 
//       render : function (data, type, row) {
//         return `<a resource-editDisable-id="`+data.resourceID+`"  data-toggle="modal"  data-target="#full-width-modal" class="btn btn-link" style="text-decoration: underline;" > `+data.resourceID+`</a>`;
//       }
//      },
//        { title: 'Resource Name', data: 'resourceName'}, 
//       { title: 'Application Name',
//       data: null, 
//       render : function (data, type, row) {
//       var arrayLength = data.applicationName;
      
//       var mul;
     
//     if(arrayLength.length === 1)
//     {
//        mul  =  data.applicationName;
//       }else{
      
//       mul= `<div class="tooltipss" >Multiple Application <span class="tooltiptext" >`+ data.applicationName +`</span>
//     </div>`;
//     }
//        return mul;
       
//       }
      
//      },

//      { title: 'Employment Type', data: 'employmentType'},{ title: 'Retain / Release', data: 'retainRelease' },
//        {title: 'Resource Class', data: 'resourceClass' },{title: 'Date Of Hire', data: 'dateOfHire'},
//       {title: 'Role', data: 'role'}, {title: 'Resource Manager Bank ID', data: 'resourceManagerBankID'},
//       {title: 'Resource Manager Name', data: 'resourceManagerName'},{title: 'Financial Department', data: 'financialDepartment'
//       },{title: 'Location Country', data: 'city'},{ title: 'Location City', data: 'country' },
//       {title: 'Current Resource Type (2018)', data: 'currentResourceType'}, {title: 'Next year Resource Type', data: 'nextYearResourceType'
//       }, {title: 'Transition Period', data: 'transitionPeriod'}, {title: 'Transition Year',data: 'transitionYear'
//       },{title: 'Remarks',data: 'remarks' }, {title: 'Administrator Access',data: 'administratorAccess'},
//       {
//         title: 'Option',
//         data: null,
//         className: "thead-light",
//         render : function (data, type, row) {
//           return `<a resource-edit-id="`+data.resourceID+`" data-toggle="modal"  data-target="#full-width-modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
//           <a resource-delete-id="`+data.resourceID+`" data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>`;
//         }
//       }
//     ]
//     };
//    // this.rerender();
//   }


  addData(){
    this.router.navigate(['dashboard/resources/add-app']);
  }

  private closeModal(): void {
   // this.backClicked();
    this.closeBtn.nativeElement.click();

  }

    
   

}
