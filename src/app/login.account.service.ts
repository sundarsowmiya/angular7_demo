import {Injectable} from '@angular/core';

const code = 'code';
const role = 'role';
const CONNECT_ID = 'CONNECT_ID';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  setToken(token: any): void { 
    console.log(token[0].code)
  localStorage.setItem(code, token[0].code)
  
    if(token[0].role){
      localStorage.setItem(role, token[0].role);
      localStorage.setItem(CONNECT_ID, token[0].accountDt.connectid);
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