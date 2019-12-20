import { Injectable } from '@angular/core';
import {LoginObject} from '../models/loginObject';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Session} from "../models/session";
import {StorageService} from "./storage.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  sessionObj: Session;
  padelUsersURL:string = 'http://fenw.etsisi.upm.es:10000/users';

  constructor(private http: HttpClient,
              private _storageService: StorageService) {
    this.sessionObj = new Session();
  }

  login(loginUser: LoginObject) {
    const url = `${this.padelUsersURL}/login?username=${loginUser.usuario}&password=${loginUser.password}`;
    return this.http.get(url, {observe: 'response'}).map(res => {
      const token = res.headers.get('Authorization');
      this.sessionObj.token = token;
      this.sessionObj.username = loginUser.usuario;
      this._storageService.setCurrentSession(this.sessionObj);
      return res;
    });
  }

  createUser(user: User) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.padelUsersURL, body, { headers });
  }

  checkUserExists(username: string) {
    const url = `${this.padelUsersURL}/${username}`;
    return this.http.get(url, {observe: 'response'});
  }

}
