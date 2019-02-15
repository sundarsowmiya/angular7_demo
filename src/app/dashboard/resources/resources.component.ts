import { 
  Component, 
  OnInit, 
  ViewChild,
  AfterViewInit, 
  Renderer, 
  OnDestroy,
  ChangeDetectorRef,
  ViewEncapsulation } from '@angular/core';
  import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import * as config from '../../../globalConfig';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css',

 ]
})
export class ResourcesComponent implements  OnInit {
dtOptions: DataTables.Settings = {};
   constructor(private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer,
    private sharedService: SharedService,
    private fb: FormBuilder) {
     }
     
  ngOnInit() {
    this.renderDatatable();
    this.sharedService.currentData.subscribe((data) => {
      if(data){
        console.log(data, "Service change");
      }
    })  
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("resource-edit-id")){
        this.router.navigate(["dashboard/resources/edit-resources/"+ event.target.getAttribute("resource-edit-id")], {queryParams:{app:"resource"}});
      }if(event.target.hasAttribute("resource-delete-id")) {
        this.router.navigate(["dashboard/resources/delete-resources/"+ event.target.getAttribute("resource-delete-id")], {queryParams:{app:"resource"}});
      }
    });
  }
  renderDatatable(){
    this.dtOptions = {
      
      ajax:{
        "url": config.gServiceUrl+'/user/getAllUsers',
        "dataSrc":function ( json ) {
          let myJson = {
            data:[]
          };
          myJson.data.push(json)
        //  console.log(myJson)
          return myJson.data[0];
        }
      }, 
      columns: [{
        title: 'Resource ID',
        data: 'resourceID'
      }, 
      {
        title: 'Resource Name',
        data: 'resourceName'
      },
      {
        title: 'Employment Type',
        data: 'employmentType'
      },
      {
        title: 'Application Name',
        data: 'applicationName'
      },
      {
        title: 'Application Name',
        data: 'applicationName'
      },
      {
        title: 'Option',
        data: null,
        className: "center",
        render : function (data, type, row) {
          return `<a resource-edit-id="`+data.userId+`" data-toggle="modal"  data-target="#full-width-modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
          <a resource-delete-id="`+data.userId+`" data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>`;
        }
      }
    ]
    };

  }

  addData(){
    this.router.navigate(['/dashboard/resources/add-app']);
  }


  

}
