import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { bestellung } from '../_interfaces/bestellung';

@Injectable({
  providedIn: 'root'
})
export class BestellungService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Host URL
   */
  bestellungsPositionUrl = 'http://localhost:3000/bestellungsPosition';
  bestellungUrl = 'http://localhost:3000/bestellung';

  /**
   * HTTP-Header
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  /**
    * Alle Bestellungen mit deren zugehörigen Produkten
    * @returns result;
    */
  getAllBestellungen() : Observable<bestellung[]> {
    const url = `${this.bestellungUrl}/bestellungMitProdukte`;
    return this.httpClient.get<bestellung[]>(url);
  }
}



