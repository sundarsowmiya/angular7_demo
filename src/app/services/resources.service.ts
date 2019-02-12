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

    constructor(private http: HttpClient) { }

    addresouces(data): Observable<ResourcesTypes[]>{
      //  console.log(this.associatesAPIurl, data, httpHeaders);
        return this.http.post<ResourcesTypes[]>(this.resourcesAPIurl, data, httpHeaders)  
    }


}