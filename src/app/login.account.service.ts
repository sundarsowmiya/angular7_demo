import {Injectable} from '@angular/core';

const code = 'code';
const role = 'role';
const resourceID = 'resourceID';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  setToken(token: any): void { 
   // console.log(token.code) ;
  localStorage.setItem(code, token.code)
  
    if(token.role){
      //console.log(token.role);
      localStorage.setItem(role, token.role);
      localStorage.setItem(resourceID, token.resourceID);
    }
    
  }

  isLogged() {
    return localStorage.getItem(code) == "LG001";
  }

  isAdmin(){
    return (localStorage.getItem("role") == "Admin" || localStorage.getItem("role") == "SUPER") ? true : false;
  }

  isSuper(){
    return localStorage.getItem("role") == "SUPER" ? true : false;
  }
}