import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EnviromentUtil } from '../util/enviroment-util';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/users';

  constructor(private http: HttpClient) { }

  getUsers():Observable<any> {
    return this.http.get(this.endpoint);
  }

  getById(id:any):Observable<any>{
    const url = this.endpoint + '/'+id;
    return this.http.get(url);
  }

  save(userData:any){
    return this.http.post(this.endpoint, userData);
  }

  update(userData:any){
    return this.http.put(this.endpoint, userData);
  }

  delete(id:any){
    const url = this.endpoint + '/'+id;
    return this.http.delete(url);
  }


}
