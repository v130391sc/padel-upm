import { Injectable } from '@angular/core';
import {LoginObject} from '../models/loginObject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUser: LoginObject;
  padelUsersURL:string = 'http://fenw.etsisi.upm.es:10000/users';

  constructor(private http: HttpClient) { }

  login(loginUser: LoginObject) {
    const url = `${this.padelUsersURL}/login?username=${loginUser.usuario}&password=${loginUser.password}`;
    return this.http.get(url);
  }
}
