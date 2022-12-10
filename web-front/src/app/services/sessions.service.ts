import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})

export class SessionsService {
  constructor() { }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveCredentials(credential: any): void {

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(this.parseJwt(credential.token)));

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, credential.token);
  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }

    return {};
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
       return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return true;
    }

    return false;
  }

  private parseJwt(token: string) {
    if(!token) {
      return;
    }

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");

    return JSON.parse(window.atob(base64));

  }
}
