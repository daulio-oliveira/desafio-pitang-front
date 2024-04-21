import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EnviromentUtil } from '../util/enviroment-util';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/cars';

  constructor(private http: HttpClient) { }

  getCars():Observable<any>{
    return this.http.get(this.endpoint);
  }

  getById(id:any):Observable<any>{
    const url = this.endpoint + '/'+id;
    return this.http.get(url);
  }

  save(carData) {
    return this.http.post(this.endpoint, carData);
  }

  update(carData){
    return this.http.put(this.endpoint, carData);
  }

  delete(id:any){
    const url = this.endpoint + '/'+id;
    return this.http.delete(url);
  }


} 