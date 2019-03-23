import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../../app/login.account.service';
import { ResourcesService } from '../../../services/resources.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  resourceID:any;
  userId:any;
  userSubMenus:any=[];
 
  constructor(private accountService:AccountService,private resourcesService: ResourcesService) { }

  ngOnInit() {

    if (this.accountService.isLogged()) {
      this.resourceID = JSON.parse(localStorage.getItem('resourceID'));
      this.userId = localStorage.getItem('userId');
      this.resourcesService.getResources(this.userId).subscribe((resources) => {
       this.userSubMenus= resources;
       //console.log(this.userSubMenus.userSubMenus);
        });
       } 
     
      

  }
  

}
