import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http'
@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http: Http) { }

  public getTodayFilter(branchid: any, url: any) {
    return this.http.get(environment.host + 'search/today-sale?branchid=' + branchid +  url)
  }
  public getTotalSalefilter(branchid: any, url: any) {
    return this.http.get(environment.host + 'search/total-sale?branchid=' + branchid +  url)
  }

  public  getSaleAndInventoryCount(branchId: any) {
    return this.http.get(environment.host + 'count-sale-inventory/' + branchId)
  }

}
