import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupServiceService {

  constructor(private http: Http) { }

  public saveWallet(data: any) {
    return this.http.post(environment.host + 'payment-types', data)
  }

  public getWallet() {
    return this.http.get(environment.host + 'payment-types');
  }

  public getBranch() {
    return this.http.get(environment.host + 'branches');
  }

  public saveBranch(data: any) {
    return this.http.post(environment.host + 'branches', data)
  }

}
