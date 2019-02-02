import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  constructor(private http:Http) { }

  public getEmployeeDetails(Url){
    return this.http.get(environment.host +'employees'+Url);
  }

  public saveEmployeeDetails(data:any){
    return this.http.post(environment.host +'employees',data)
  }
}
