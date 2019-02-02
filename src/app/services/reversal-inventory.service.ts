import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReversalInventoryService {

  constructor(private http:Http) { }

  public addReversalInventory(data: any) {
    return this.http.post(environment.host + 'reversal-inventory', data)
  }

  public getReversalInventory(brurl:any) {
    return this.http.get(environment.host + 'reversal-inventory' + brurl)
  }

}
