import {Injectable} from '@angular/core';

const code = 'code';
const role = 'role';
const resourceID = 'resourceID';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  setToken(token: any): void { 
  localStorage.setItem(code, token.code)

    if(token.administratorAccess){
      localStorage.setItem(role, token.administratorAccess);
      localStorage.setItem(resourceID, token.resourceID);
    }
    
  }

  isLogged() {
    return localStorage.getItem(code) == "LG001";
  }

  isAdmin(){
    return (localStorage.getItem("role") == "Yes" || localStorage.getItem("role") == "SUPER") ? true : false;
  }

  isSuper(){
    return localStorage.getItem("role") == "SUPER" ? true : false;
  }
}