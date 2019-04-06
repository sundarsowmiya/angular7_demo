import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourcesService} from '../../../services/resources.service';
import { ToastrService } from 'ngx-toastr';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-delete-resources',
  templateUrl: './delete-resources.component.html',
  styleUrls: ['./delete-resources.component.css']
})
export class DeleteResourcesComponent implements OnInit {
  DeleteResourcesForm;
  dtOptions;
  dataTable:any;
  administratorAccess;
  adminUser;
  adminAccess;
  constructor(
    private _location: Location, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private resourcesService: ResourcesService, f: FormBuilder) { 

      this.DeleteResourcesForm=f.group({
      });
    }
  
  ngOnInit() {
    this.resourcesService.getResources(this.route.snapshot.params.id).subscribe((response:any) => {
      this.adminUser =response.administratorAccess;
     if(this.adminUser == "Yes"){
       this.adminAccess ='Are you sure you want to delete Admin User?'
     }else{
      this.adminAccess ='Are you sure you want to delete?'
     }
    });

  }

  deleteResources(){
    this.resourcesService.deleteresources(this.route.snapshot.params.id).subscribe(
      (response:any)=> {
        if (response.code == 'DL003' || response.code== "" || response.code== null) {
          this.toastr.error('Failure to Delete user '+this.route.snapshot.params.id);
       }
       else {
        this.backClicked();
        this.toastr.info('Resource '+this.route.snapshot.params.id+ ' deleted');
       $('#datatable-buttons').DataTable().ajax.reload();
       }
        
      },
      (error) => console.log(error)
    )    
  }
  backClicked() {
    this._location.back();
}
}

 