import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {LoginService} from '../services/login.service';
import {AccountService} from '../login.account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginControlForm: FormGroup;
    userName;
    password;
    token:null;
    constructor(fb: FormBuilder, 
      private router:Router,
      private loginService:LoginService,
      private accountService:AccountService) {
        this.loginControlForm = fb.group({
        userName:["", Validators.required],
        password:["", Validators.required]
        });
        this.userName = this.loginControlForm.get('userName');
        this.password = this.loginControlForm.get('password');
    }

  ngOnInit() {
  }
   loginAccount(){
    // this.loginService.loginCheck(this.loginControlForm.value).subscribe((response)=>{
    
    // this.accountService.setToken(response);
     this.router.navigateByUrl("/dashboard");
   // }); 
   }

}
