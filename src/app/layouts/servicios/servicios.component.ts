import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  color: string = '';
  icon: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  changeStyle($event) {
    this.color = $event.type == 'mouseover' ? 'circle' : '';
    this.icon = $event.type == 'mouseover' ? 'icono' : '';
  }
}
