import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FooterServiceService {

  constructor(private http: Http) { }

  public globalSearch(val: any) {
    console.log(val);
    return this.http.get(environment.host + 'search/global?' + val)
  }
  public priceSearch(val: any) {
    return this.http.get(environment.host + 'search/price-check/' + val)
  }
}
