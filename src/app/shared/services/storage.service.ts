import { Injectable } from '@angular/core';
import {Session} from "../models/session";
import {Router} from '@angular/router';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sessionStorageService;
  private currentSession: Session = null;

  constructor(private router: Router) {
    this.sessionStorageService = sessionStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.sessionStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session{
    let sessionStr = this.sessionStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }
  removeCurrentSession(): void {
    this.sessionStorageService.removeItem('currentUser');
    this.currentSession = null;
  }
  getCurrentUser(): string {
    let session: Session = this.getCurrentSession();
    return (session && session.username) ? session.username : null;
  };
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };
  getCurrentToken(): string {
    let session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };
  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/']);
  }
}
