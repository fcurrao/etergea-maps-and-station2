
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  

  getAllApis(): Observable<any>{
    // return this.http.get(environment.baseUrl + 'api/dataApi' );
    return this.http.get('http:localhost:4200/' + 'api/dataApi' );
  }

  getAllEtergeas(): Observable<any>{
    // return this.http.get(environment.baseUrl + 'api/getAll' );
    return this.http.get('http:localhost:4200/' + 'api/getAll' );
  }

  // getOneEtergea(id:number): Observable<any>{
  //   // return this.http.get(environment.baseUrl + 'api/getOne' );
  //   return this.http.get('http:localhost:4200/' + 'api/getOne' );
  // }
 
  getOneEtergea(id:number): Observable<any> {
    const url = `./assets/${id}.json`; // Ruta relativa al archivo JSON

    return this.http.get<any>(url);
  }



}