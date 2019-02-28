import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class InventoryAssigningService {

  constructor(private http: Http) { }

  public addInventoryAssign(data: any) {
    return this.http.post(environment.host + 'invassigns', data)
  }

  public getAcknowledgeList(brurl: any) {
    console.log(environment.host + 'invassigns?status=1' + brurl)
    return this.http.get(environment.host + 'invassigns?status=1' + brurl);
  }

  public getInventoryList(brurl: any) {
    console.log(environment.host + 'invassigns?status=2' + brurl)
    return this.http.get(environment.host + 'invassigns?status=2' + brurl);
  }

  public getRejectedList() {
    return this.http.get(environment.host + 'invassigns?status=0');
  }

}

