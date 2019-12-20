import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../shared/services/storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username:string = 'Anonymous';

  constructor(private _storageService: StorageService) { }

  ngOnInit() {
  }

  isLogged(): boolean{
    this.username = this._storageService.getCurrentUser();
    return this._storageService.isAuthenticated();
  }

  logout(): void{
    this.username = 'Anonymous';
    this._storageService.logout();
  }
}
