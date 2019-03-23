import {Injectable} from '@angular/core';

const code = 'code';
const role = 'role';
const resourceID = 'resourceID';
const userId = 'userId';
const resourceName = 'resourceName';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  setToken(token: any): void { 
  localStorage.setItem(code, token.code)
    if(token.administratorAccess){
      console.log(token);
      localStorage.setItem(role, token.administratorAccess);
      localStorage.setItem(resourceID, token.resourceID);
      localStorage.setItem(userId, token.userId);
      localStorage.setItem(resourceName, token.resourceName);
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