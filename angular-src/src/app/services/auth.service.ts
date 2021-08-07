import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient,
    private jwtHelperService: JwtHelperService) { }

  storeUserData(authToken: any, user: any) {
    localStorage.setItem('id_token', authToken);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = authToken;
    this.user = user;
  }

  registerUser(user: any) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/register', user, { headers: headers })
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, { headers: headers })
  }

  getProfile() {
    this.loadToken()
    let headers = new HttpHeaders().append('Authorization', this.authToken);
    return this.http.get<any>('http://localhost:3000/users/profile', { headers: headers });
  }

  deleteUser(id: any) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/delete', id, { headers: headers })
  }

  updateUser(user: any) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/update', user, { headers: headers })
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token')
  }

  loggedIn() {
    return !this.jwtHelperService.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
