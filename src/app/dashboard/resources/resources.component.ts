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
//import { saveAs } from 'file-saver';
import * as $ from 'jquery';
import { ResourcesService } from '../../services/resources.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders={
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css',

 ]
})
export class ResourcesComponent implements  OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  titleHeading = 'Resources';
  selectedFile;
  dtOptions: DataTables.Settings = {};
  uploadFileData;
  uploadResoucesForm:FormGroup;
  dtTrigger;
  dropDownlist:any;;
  uploadedFiles: any[] = [];
  spinnerFlag;
  isDisabled = true
  changeText: boolean;
    constructor(private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer,
    private sharedService: SharedService,
    private http: HttpClient,
    private fb: FormBuilder,
    private resourcesService:ResourcesService,
    private toastr: ToastrService) {
      this.changeText = false;
      this.uploadResoucesForm = fb.group({
        uploadFileData: ["",[Validators.required]],
      });
      this.uploadFileData = this.uploadResoucesForm.get('uploadFileData');
     }
    
  ngOnInit() {
    this.renderDatatable();
    this.sharedService.currentData.subscribe((data) => {
      if(data){
        console.log(data, "Service change");
      }
    })  

  }

  downloadtable():void {
    this.resourcesService.getResourcesall().subscribe((resources) => {
     // console.log(resources);
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
  }
  renderDatatable(){
    this.dtOptions = {
      scrollX: true,
      
      ajax:{
        "url": config.gServiceUrl+'/users',
        "dataSrc":function ( json ) {
          let myJson = {
            data:[]
          };
          
          myJson.data.push(json)
        //  console.log(myJson)
          return myJson.data[0];
        }
        
      }, 
      columns: [{title: 'Domain', data: 'domain'},
      { title: 'Resource ID',
      data: null, 
      render : function (data, type, row) {
        return `<a resource-editDisable-id="`+data.resourceID+`"  data-toggle="modal"  data-target="#full-width-modal" class="btn btn-link" style="text-decoration: underline;" > `+data.resourceID+`</a>`;
      }
     },
       { title: 'Resource Name', data: 'resourceName'}, 
      //{title: 'Application Name', data: 'applicationName' },
      { title: 'Application Name',
      data: null, 
      render : function (data, type, row) {
        //console.log(row);
       
      var arrayLength = data.applicationName;
      var mul;
      console.log(arrayLength.length);
    if(arrayLength.length === 1)
    {
      mul =  data.applicationName ;
     
    }else{
      mul= `<span  data-toggle="tooltip" title="` + data.applicationName + `">Multiple</span>`;
    
    }
    
       console.log(mul);
       return mul;
       
      }
      
     },

    
    

      { title: 'Employment Type', data: 'employmentType'},{ title: 'Retain / Release', data: 'retainRelease' },
       {title: 'Resource Class', data: 'resourceClass' },{title: 'Date Of Hire', data: 'dateOfHire'},
      {title: 'Role', data: 'role'}, {title: 'Resource Manager Bank ID', data: 'resourceManagerBankID'},
      {title: 'Resource Manager Name', data: 'resourceManagerName'},{title: 'Financial Department', data: 'financialDepartment'
      },{title: 'Location Country', data: 'city'},{ title: 'Location City', data: 'country' },
      {title: 'Current Resource Type (2018)', data: 'currentResourceType'}, {title: 'Next year Resource Type', data: 'nextYearResourceType'
      }, {title: 'Transition Period', data: 'transitionPeriod'}, {title: 'Transition Year',data: 'transitionPeriod'
      },{title: 'Remarks',data: 'remarks' }, {title: 'Administrator Access',data: 'administratorAccess'},
      {
        title: 'Option',
        data: null,
        className: "thead-light",
        render : function (data, type, row) {
          return `<a resource-edit-id="`+data.resourceID+`" data-toggle="modal"  data-target="#full-width-modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
          <a resource-delete-id="`+data.resourceID+`" data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>`;
        }
      }
    ]
    };

  }


  addData(){
    this.router.navigate(['dashboard/resources/add-app']);
  }

  private closeModal(): void {
   // this.backClicked();
    this.closeBtn.nativeElement.click();

  }

    
   

}
