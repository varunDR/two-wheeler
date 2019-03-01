import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class IndentService {

  constructor(private http:Http) { }

  public addIndent(data: any) {
    return this.http.post(environment.host + 'indents', data)
  }

  public getIndentList(brurl:any){
    return this.http.get( environment.host + 'indents'+brurl);
  }

}