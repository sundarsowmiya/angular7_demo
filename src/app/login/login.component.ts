import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {LoginService} from '../services/login.service';
import {AccountService} from '../login.account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginControlForm: FormGroup;
    userName;
    password;
    toastmsg: any[] = [];
    token:null;
    constructor(fb: FormBuilder, 
      private router:Router,
      private loginService:LoginService,
      private accountService:AccountService,
      private toastr: ToastrService) {
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
     this.loginService.loginCheck(this.loginControlForm.value).subscribe(
       (response:any)=>{
      if (response.code == 'LG001') {
        this.accountService.setToken(response);
         if(this.accountService.isAdmin()) {
          this.router.navigateByUrl("/dashboard");
          this.toastr.info('Welcome to TnC Dashboard Reports.');
         }else{
          this.toastr.error('Not an Admin');
         }
    } else {
      this.toastr.error('Invalid username or password');
    }
   }); 
   }

}
