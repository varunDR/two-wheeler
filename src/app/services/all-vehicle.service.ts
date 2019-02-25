import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AllVehicleService {

  constructor(private http: Http) { }

  public getColor() {
    return this.http.get(environment.host + 'vehicle-colors');
  }
  public addColor(data: any) {
    return this.http.post(environment.host + 'vehicle-colors', data);
  }
  public getCategory() {
    return this.http.get(environment.host + 'vehicle-types');
  }
  public addCategory(data: any) {
    return this.http.post(environment.host + 'vehicle-types', data);
  }
  public getModel() {
    return this.http.get(environment.host + 'vehicle-models');
  }
  public addModel(data: any) {
    return this.http.post(environment.host + 'vehicle-models', data);
  }
  public getVariant() {
    return this.http.get(environment.host + 'vehicle-variants');
  }
  public addVariant(data: any) {
    return this.http.post(environment.host + 'vehicle-variants', data);
  }

  public getOtpNumbers() {
    return this.http.get(environment.host + 'discount-otp-no');
  }

  public addOtpNumber(data: any) {
    return this.http.post(environment.host + 'discount-otp-no', data);
  }

  public getFinance() {
    return this.http.get(environment.host + 'finance-name');
  }

  public addFinance(data: any) {
    return this.http.post(environment.host + 'finance-name', data);
  }
  public getVehicleDetails() {
    return this.http.get(environment.host + 'vehile-details ');
  }
  public getVehicleFilter(url: any) {
    console.log(environment.host + 'vehile-details?' + url)
    return this.http.get(environment.host + 'vehile-details?' + url)
  }
}
