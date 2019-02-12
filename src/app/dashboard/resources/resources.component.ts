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
    private fb: FormBuilder) {
     }
     
  ngOnInit() {
    this.renderDatatable();
        
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
        title: 'Bank Id',
        data: 'bankID'
      }, 
      {
        title: 'Name',
        data: 'name'
      },
      {
        title: 'Department',
        data: 'department'
      },
      {
        title: 'Location',
        data: 'location'
      },
      {
        title: 'Option',
        data: null,
        className: "center",
        render : function (data, type, row) {
          return `<a  data-toggle="modal" class="btn default btn-xs purple"><i class="mdi mdi-square-edit-outline"></i> Edit </a>
          <a  data-toggle="modal" class="btn default btn-xs black"><i class="mdi mdi-delete"></i> Delete</a>
          `;
        }
      }
    ]
    };

  }
  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }
  addData(){
    this.router.navigate(['/dashboard/resources/add-app']);
  }


  

}
