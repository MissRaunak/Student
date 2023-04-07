import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  [x: string]: any;
  hide: any;

  constructor(private _http: HttpClient) { }
  URL = "http://localhost:3000/employee";
  getemployeelist(): Observable<any> {
    return this._http.get<any>(this.URL);
  }
  addemployee(data: any): Observable<any> {
    return this._http.post(this.URL, data);
  }
  deletedata(id: any) {
    return this._http.delete(`${this.URL}/${id}`)
  }
  getCurrentdata(id: any) {
    return this._http.get<any>(`${this.URL}/${id}`)
  }
  updatedata(id: any, data: any) {
    return this._http.put(`${this.URL}/${id}`, data)
  }
}

