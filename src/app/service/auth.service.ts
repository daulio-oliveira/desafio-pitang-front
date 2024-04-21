import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnviromentUtil } from '../util/enviroment-util';
import { User } from '../domains/user.domain';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  api = EnviromentUtil.API;

  private loggedIn = new BehaviorSubject<boolean>(false);
  private meData: User;
  private nameUserIn = new BehaviorSubject<string>("");

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  setLoggedIn(isLogged: boolean) :void {
    this.loggedIn.next(isLogged);
  }

  login(user: any) {
    const endpoint = this.api+'/signin';
    return this.http.post(endpoint, user).pipe(
      map((response: any) => {
        const token = response.token;
        this.loggedIn.next(true);
        localStorage.setItem('access_token', token);
        this.setNameUserIn()
      })
    );
  }

  logout() {
    this.nameUserIn.next("")
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  me():Observable<any>{
    const endpoint = this.api+'/me';
    return this.http.get(endpoint);
  }


  setNameUserIn() {
    this.me().subscribe(res => {
      this.nameUserIn.next(res.firstName+" "+ res.lastName)
    });
  
  }

  get getNameUserIn() {
    return this.nameUserIn.asObservable();
  }


}
