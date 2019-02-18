import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import * as config from '../../globalConfig';
import { ResourcesTypes } from '../types/resources.type';

import { map } from 'rxjs/operators';

const httpHeaders={
    headers: new HttpHeaders({'Content-Type': 'application/json' })
}


@Injectable({
    providedIn: 'root'
})

export class ResourcesService{
    resourcesAPIurl: any = config.gServiceUrl+"/user/create";
    resourcesAPIurlDelete: any = config.gServiceUrl+"/user/delete";
    resourcesAPIurlGet: any = config.gServiceUrl+"/user";
    resourcesAPIurlEdit: any = config.gServiceUrl+"/user/editUser";
   // http://localhost:8102/user/editUser 
   //http://localhost:8102/user/delete/5c5d60341a6a3837b84685ce 
    constructor(private http: HttpClient) { }

    addresouces(data): Observable<ResourcesTypes[]>{
        return this.http.post<ResourcesTypes[]>(this.resourcesAPIurl, data, httpHeaders)  
    }
    
    deleteresources(id:number): Observable<ResourcesTypes[]>{
        return this.http.delete<ResourcesTypes[]>(this.resourcesAPIurlDelete+"/"+id, httpHeaders);
    }
  
    getResources(id:number): Observable<ResourcesTypes[]>{
        //console.log(id);
        console.log(this.resourcesAPIurlGet+"/"+id);
        return this.http.get<ResourcesTypes[]>(this.resourcesAPIurlGet+"/"+id);
    }
    
    
    editResources(data): Observable<ResourcesTypes[]>{
      //  console.log(id);
      //  console.log(data);
        return this.http.put<ResourcesTypes[]>(this.resourcesAPIurlEdit, data, httpHeaders)  
    }
}