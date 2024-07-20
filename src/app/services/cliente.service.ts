import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Global } from '../enviroment/global.component';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  registro_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.url + 'user', JSON.stringify(data), {
      headers: headers,
    });
  }

  login_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', data, { headers: headers });
  }


  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
}
