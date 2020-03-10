import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    const sessionActive = localStorage.getItem('isAuthenticated');
    return !!sessionActive;
  }

  authenticateUser() {
    localStorage.setItem('isAuthenticated', 'true');
  }

  login() {

  }

  clearSessionData() {
    localStorage.removeItem('isAuthenticated');
  }

  appendIP(requestUrl: string) {
    requestUrl = environment.apiBaseUrl + requestUrl;
    return requestUrl;
  }
}
