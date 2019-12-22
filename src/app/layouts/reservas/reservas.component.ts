import {Component, OnInit} from '@angular/core';
import {ReservasService} from '../../shared/services/reservas.service';
import {Reserve} from '../../shared/models/reserve';
import {parseDate} from 'ngx-bootstrap';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  hours: string[] = ['10:00h 11:00h', '11:00h 12:00h', '12:00h 13:00h', '13:00h 14:00h', '14:00h 15:00h', '15:00h 16:00h', '16:00h 17:00h', '17:00h 18:00h', '18:00h 19:00h', '19:00h 20:00h', '20:00h 21:00h'];

  reservations: Reserve[] = [];
  court1Reserve: Reserve[] = [];
  court2Reserve: Reserve[] = [];
  court3Reserve: Reserve[] = [];
  court4Reserve: Reserve[] = [];

  userReservations: Reserve[] = [];

  mostrarTabla: boolean = false;

  constructor(private _reservasServices: ReservasService) {
  }

  ngOnInit() {
    this.getUserReservations();
  }

  getUserReservations() {
    this._reservasServices.getReservationsDoneByUser().subscribe(resp => {
      this.userReservations = resp.body;
      this._reservasServices.actualizarToken(resp.status, resp.headers.get('Authorization'));
    }, error => {
      this._reservasServices.actualizarToken(error.status, error.headers.get('Authorization'));
    });
  }

  showReservationsByDate(dateSelected: string) {
    console.log(dateSelected);
    if (dateSelected === null || dateSelected === undefined || dateSelected === '') {
      this.mostrarTabla = false;
    } else {
      let date: Date = parseDate(dateSelected);
      this.court1Reserve = [];
      this.court2Reserve = [];
      this.court3Reserve = [];
      this.court4Reserve = [];
      this._reservasServices.getAllReservationsByDate(date.getTime()).subscribe(resp => {
        this._reservasServices.actualizarToken(resp.status, resp.headers.get('Authorization'));
        this.reservations = resp.body;
        for (let reserve of this.reservations) {
          if (reserve.courtId === 1) {
            this.court1Reserve.push(reserve);
          } else if (reserve.courtId === 2) {
            this.court2Reserve.push(reserve);
          } else if (reserve.courtId === 3) {
            this.court3Reserve.push(reserve);
          } else if (reserve.courtId === 4) {
            this.court4Reserve.push(reserve);
          }
        }
        this.fillInReservationsArray(this.court1Reserve, 1, dateSelected);
        this.fillInReservationsArray(this.court2Reserve, 2, dateSelected);
        this.fillInReservationsArray(this.court3Reserve, 3, dateSelected);
        this.fillInReservationsArray(this.court4Reserve, 4, dateSelected);
        this.mostrarTabla = true;
      }, error => {
        this._reservasServices.actualizarToken(error.status, error.headers.get('Authorization'));
      });
    }
  }

  submitReserve(reserve: Reserve) {
    this._reservasServices.createReserve(reserve).subscribe(resp => {
      this.showReservationsByDate(reserve.rsvday);
      this.getUserReservations();
      this._reservasServices.actualizarToken(resp.status, resp.headers.get('Authorization'));
    }, error => {
      this._reservasServices.actualizarToken(error.status, error.headers.get('Authorization'));
    });
  }

  deleteReserve(reserve: Reserve) {
    this._reservasServices.deleteReserveById(reserve.rsvId).subscribe(resp => {
      this.getUserReservations();
      this._reservasServices.actualizarToken(resp.status, resp.headers.get('Authorization'));
    }, error => {
      this._reservasServices.actualizarToken(error.status, error.headers.get('Authorization'));
    });
  }

  fillInReservationsArray(arrayReservations: Reserve[], courtId: number, dateSelected: string) {
    if (!this.existHourInReservations(arrayReservations, '10:00')) {
      let reserve1: Reserve = new Reserve();
      reserve1.rsvtime = '10:00';
      reserve1.courtId = courtId;
      reserve1.rsvday = dateSelected;
      reserve1.rsvdateTime = new Date(Date.parse(dateSelected + ' 10:00:00')).getTime();
      arrayReservations.splice(0, 0, reserve1);
    }
    if (!this.existHourInReservations(arrayReservations, '11:00')) {
      let reserve2: Reserve = new Reserve();
      reserve2.rsvtime = '11:00';
      reserve2.courtId = courtId;
      reserve2.rsvday = dateSelected;
      reserve2.rsvdateTime = new Date(Date.parse(dateSelected + ' 11:00:00')).getTime();
      arrayReservations.splice(1, 0, reserve2);
    }
    if (!this.existHourInReservations(arrayReservations, '12:00')) {
      let reserve3: Reserve = new Reserve();
      reserve3.rsvtime = '12:00';
      reserve3.courtId = courtId;
      reserve3.rsvday = dateSelected;
      reserve3.rsvdateTime = new Date(Date.parse(dateSelected + ' 12:00:00')).getTime();
      arrayReservations.splice(2, 0, reserve3);
    }
    if (!this.existHourInReservations(arrayReservations, '13:00')) {
      let reserve4: Reserve = new Reserve();
      reserve4.rsvtime = '13:00';
      reserve4.courtId = courtId;
      reserve4.rsvday = dateSelected;
      reserve4.rsvdateTime = new Date(Date.parse(dateSelected + ' 13:00:00')).getTime();
      arrayReservations.splice(3, 0, reserve4);
    }
    if (!this.existHourInReservations(arrayReservations, '14:00')) {
      let reserve5: Reserve = new Reserve();
      reserve5.rsvtime = '14:00';
      reserve5.courtId = courtId;
      reserve5.rsvday = dateSelected;
      reserve5.rsvdateTime = new Date(Date.parse(dateSelected + ' 14:00:00')).getTime();
      arrayReservations.splice(4, 0, reserve5);
    }
    if (!this.existHourInReservations(arrayReservations, '15:00')) {
      let reserve6: Reserve = new Reserve();
      reserve6.rsvtime = '15:00';
      reserve6.courtId = courtId;
      reserve6.rsvday = dateSelected;
      reserve6.rsvdateTime = new Date(Date.parse(dateSelected + ' 15:00:00')).getTime();
      arrayReservations.splice(5, 0, reserve6);
    }
    if (!this.existHourInReservations(arrayReservations, '16:00')) {
      let reserve7: Reserve = new Reserve();
      reserve7.rsvtime = '16:00';
      reserve7.courtId = courtId;
      reserve7.rsvday = dateSelected;
      reserve7.rsvdateTime = new Date(Date.parse(dateSelected + ' 16:00:00')).getTime();
      arrayReservations.splice(6, 0, reserve7);
    }
    if (!this.existHourInReservations(arrayReservations, '17:00')) {
      let reserve8: Reserve = new Reserve();
      reserve8.rsvtime = '17:00';
      reserve8.courtId = courtId;
      reserve8.rsvday = dateSelected;
      reserve8.rsvdateTime = new Date(Date.parse(dateSelected + ' 17:00:00')).getTime();
      arrayReservations.splice(7, 0, reserve8);
    }
    if (!this.existHourInReservations(arrayReservations, '18:00')) {
      let reserve9: Reserve = new Reserve();
      reserve9.rsvtime = '18:00';
      reserve9.courtId = courtId;
      reserve9.rsvday = dateSelected;
      reserve9.rsvdateTime = new Date(Date.parse(dateSelected + ' 18:00:00')).getTime();
      arrayReservations.splice(8, 0, reserve9);
    }
    if (!this.existHourInReservations(arrayReservations, '19:00')) {
      let reserve10: Reserve = new Reserve();
      reserve10.rsvtime = '19:00';
      reserve10.courtId = courtId;
      reserve10.rsvday = dateSelected;
      reserve10.rsvdateTime = new Date(Date.parse(dateSelected + ' 19:00:00')).getTime();
      arrayReservations.splice(9, 0, reserve10);
    }
    if (!this.existHourInReservations(arrayReservations, '20:00')) {
      let reserve11: Reserve = new Reserve();
      reserve11.rsvtime = '20:00';
      reserve11.courtId = courtId;
      reserve11.rsvday = dateSelected;
      reserve11.rsvdateTime = new Date(Date.parse(dateSelected + ' 20:00:00')).getTime();
      arrayReservations.splice(10, 0, reserve11);
    }
  }

  existHourInReservations(arrayReservations: Reserve[], hour: string): boolean {
    let found = false;
    for (let i = 0; i < arrayReservations.length; i++) {
      if (arrayReservations[i].rsvtime === hour) {
        found = true;
        break;
      }
    }
    return found;
  }
}
