import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from '../../../../app/login.account.service';
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
 
  resourceID:string;
  role:string;
  pushM:boolean=true;
  constructor(private router: Router,private accountService:AccountService) { }

  ngOnInit() {
   if (this.accountService.isLogged()) {
   this.resourceID = JSON.parse(localStorage.getItem('resourceID'));
    this.role = localStorage.getItem('role');
    
    } 
  }
  //resourceID = JSON.parse(localStorage.getItem('resourceID'));

  userLogout(){
    this.router.navigate(['../login']);
    localStorage.clear();
  }
  pushmenu(){
   // this.pushM = !this.pushM;
    if(document.querySelector("body").classList.contains("enlarged")){
      document.querySelector("body").classList.remove("enlarged")
     }else{
     document.querySelector("body").classList.add("enlarged")
     }
    
  }
}
