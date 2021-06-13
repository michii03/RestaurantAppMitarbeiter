import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { bestellung } from '../_interfaces/bestellung';
import { produkt } from '../_interfaces/produkte';

@Injectable({
  providedIn: 'root'
})
export class BestellungService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Host URL
   */
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
   * Alle Produkte die als nicht zubereitet markiert sind werden geliefert
   * @returns nicht zubereiteten Produkte
   */
  
  getBestellungen(): Observable<bestellung[]>{
    const url = `${this.bestellungUrl}/BestellungMitPositionen`;
    return this.httpClient.get<bestellung[]>(url);
  }

  getProdukteFromBestellung(id : number): Observable<produkt[]>{
    const url = `${this.bestellungUrl}/BestellungMitPositionen/`+id;
    return this.httpClient.get<produkt[]>(url);
  }

  
}



