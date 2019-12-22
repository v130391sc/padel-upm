import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Reserve} from '../models/reserve';
import {Session} from '../models/session';
import {NewReserve} from '../models/newReserve';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  padelReservationsURL: string = 'http://fenw.etsisi.upm.es:10000/reservations';

  constructor(private http: HttpClient,
              private _storageService: StorageService) {
  }

  createReserve(reserve: Reserve) {
    let reserveAux: NewReserve = new NewReserve();
    reserveAux.courtid = reserve.courtId;
    reserveAux.rsvdatetime = reserve.rsvdateTime;
    console.log(reserveAux);
    let body = JSON.stringify(reserveAux);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this._storageService.getCurrentToken()
    });
    return this.http.post(this.padelReservationsURL, body, {headers, observe: 'response'});
  }

  getReservationsDoneByUser() {
    const url = `${this.padelReservationsURL}`;
    let headers = new HttpHeaders({
      'Authorization': this._storageService.getCurrentToken()
    });
    return this.http.get<Reserve[]>(url, {headers, observe: 'response'});
  }

  getAllReservationsByDate(date: number) {
    const url = `${this.padelReservationsURL}/${date}`;
    let headers = new HttpHeaders({
      'Authorization': this._storageService.getCurrentToken()
    });
    return this.http.get<Reserve[]>(url, {headers, observe: 'response'});
  }

  deleteReserveById(reserveId: number) {
    const url = `${this.padelReservationsURL}/${reserveId}`;
    let headers = new HttpHeaders({
      'Authorization': this._storageService.getCurrentToken()
    });
    return this.http.delete(url, {headers, observe: 'response'});
  }

  actualizarToken(statusCode: number, newToken: string) {
    if (statusCode === 401) {
      this._storageService.logout();
    } else if (statusCode === 200) {
      let session: Session = new Session();
      session.username = this._storageService.getCurrentUser();
      session.token = newToken;
      this._storageService.setCurrentSession(session);
    }
  }

}
