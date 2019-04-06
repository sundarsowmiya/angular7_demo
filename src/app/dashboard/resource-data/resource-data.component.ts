import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-resource-data',
  templateUrl: './resource-data.component.html',
  styleUrls: ['./resource-data.component.css']
})
export class ResourceDataComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

 

  ngOnInit(): void {
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
      {
        title: 'Resource ID',
        data: null,
        render: function (data, type, row) {
          return `<a resource-editDisable-id="` + data.resourceID + `"  data-toggle="modal"  data-target="#full-width-modal" class="btn btn-link" style="text-decoration: underline;" > ` + data.resourceID + `</a>`;
        }
      },
      { title: 'Resource Name', data: 'resourceName' },
      {
        title: 'Application Name',
        data: null,
        render: function (data, type, row) {
          var arrayLength = data.applicationName;

          var mul;

          if (arrayLength.length === 1) {
            mul = data.applicationName;
          } else {

            mul = `<div class="tooltipss" >Multiple Application <span class="tooltiptext" >` + data.applicationName + `</span>
    </div>`;
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
      // ajax: 'http://10.23.213.157:8888/users?appName=&resourceId=&domain=',
      // columns: [{
      //   title: 'ID',
      //   data: 'id'
      // }, {
      //   title: 'First name',
      //   data: 'firstName'
      // }, {
      //   title: 'Last name',
      //   data: 'lastName'
      // }]
    };
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          console.log(this['value']);
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
          }
        });
      });
    });
  }

}
