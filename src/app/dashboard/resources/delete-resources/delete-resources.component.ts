import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourcesService} from '../../../services/resources.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete-resources',
  templateUrl: './delete-resources.component.html',
  styleUrls: ['./delete-resources.component.css']
})
export class DeleteResourcesComponent implements OnInit {
  DeleteResourcesForm;
  constructor(
    private _location: Location, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private resourcesService: ResourcesService, f: FormBuilder) { 

      this.DeleteResourcesForm=f.group({
      });
    }

  ngOnInit() {
  }

  deleteResources(){
    this.resourcesService.deleteresources(this.route.snapshot.params.id).subscribe(
      (response:any)=> {
        if (response.code == 'DL003' || response.code== "" || response.code== null) {
          this.toastr.error('Failure to Delet.');
       }
       else {
        //this.backClicked();
        this.router.navigate(['/dashboard/resources']);
        this.toastr.info('Record Deleted.');
       
       }
        
      },
      (error) => console.log(error)
    )    
  }
  backClicked() {
    this._location.back();
}
}

 