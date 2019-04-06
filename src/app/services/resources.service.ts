import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import * as config from '../../globalConfig';
import { ResourcesTypes } from '../types/resources.type';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const httpHeaders={
    headers: new HttpHeaders({'Content-Type': 'application/json' })
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
    providedIn: 'root'
})

export class ResourcesService{

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }

      private saveAsExcelFile(buffer: any, fileName: string): void {
       const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
       FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
     }

    resourcesAPIurl: any = config.gServiceUrl+"/user/create";
    resourcesAPIurlDelete: any = config.gServiceUrl+"/user/delete";
    resourcesAPIurlGet: any = config.gServiceUrl+"/user";
    resourcesAPIurlEdit: any = config.gServiceUrl+"/user/edit";
    resourcesAPIurlGetall: any = config.gServiceUrl+"/users";
    resourcesAPIdocurl:any = config.gServiceUrl+'/user/uploadexcelfile'; 
    resourcesAPIurlDropDownList: any = config.gServiceUrl+'/dropdownlist';
    resourcesAPIduplicate:any = config.gServiceUrl+'/user/validate';
    
    constructor(private http: HttpClient) { }

    addresouces(data): Observable<ResourcesTypes[]>{
        return this.http.post<ResourcesTypes[]>(this.resourcesAPIurl, data, httpHeaders)  
    }
    
    deleteresources(id:number): Observable<ResourcesTypes[]>{
        return this.http.delete<ResourcesTypes[]>(this.resourcesAPIurlDelete+"/"+id, httpHeaders);
    }
  
    getResources(id:number): Observable<ResourcesTypes[]>{
        return this.http.get<ResourcesTypes[]>(this.resourcesAPIurlGet+"/"+id);
    }
    
    
    editResources(data): Observable<ResourcesTypes[]>{
        return this.http.put<ResourcesTypes[]>(this.resourcesAPIurlEdit, data, httpHeaders)  
    }

    getResourcesall(): Observable<ResourcesTypes[]>{
        return this.http.get<ResourcesTypes[]>(this.resourcesAPIurlGetall);
    }



    uploadDocument(data): Observable<FormData[]> {

     return this.http.post<FormData[]>(this.resourcesAPIdocurl, data);
    }
    
    getDropDownlist(): Observable<ResourcesTypes[]>{
        return this.http.get<ResourcesTypes[]>(this.resourcesAPIurlDropDownList);
    }

    resoucesDuplicate(data):Observable<ResourcesTypes[]>{
        return this.http.get<ResourcesTypes[]>(this.resourcesAPIduplicate+"/"+data);
    }
}