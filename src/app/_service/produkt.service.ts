// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
// import { Kategorie, Produkt, ProdukteKoch } from '../_interface/produkt';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProduktService {

//   constructor(private httpClient: HttpClient) { }

//   /**
//    * Host URL
//    */
//   produktUrl = 'http://localhost:3000/produkt';

//   /**
//    * HTTP-Header
//    */
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json'
//     })
//   }

//   /**
//    * Produkt mit angegebener ID wird geliefert
//    * @param id des gesuchten Produktes
//    * @returns Produkt
//    */
//   getSingleProdukt(id: number): Observable<Produkt>{
//     const url = `${this.produktUrl}/${id}`;
//     return this.httpClient.get<Produkt>(url);
//   }

//   /**
//    * Alle Produkte der DB
//    * @returns alle PRodukte
//    */
//   getAllProdukt(): Observable<Produkt[]>{
//     return this.httpClient.get<Produkt[]>(this.produktUrl)
//   }

//   /**
//    * Übergebenes Produkt wird in der DB persistiert
//    * @param produkt das persistiert werden soll
//    * @returns eben angelegtes Produkt-Object
//    */
//   addProdukt(produkt: Produkt): Observable<Produkt>{
//     const url = `${this.produktUrl}/create`
//     return this.httpClient.post<Produkt>(url, produkt, this.httpOptions)
//   }

//   /**
//    * Übergebenes Produkt wird in der DB geändert
//    * @param produkt das geändert persisitent werden soll
//    * @returns eben geändertes Produkt-Object
//    */
//   updateProdukt(produkt: Produkt): Observable<Produkt>{
//     const url = `${this.produktUrl}/update/${produkt.id}`;
//     return this.httpClient.put<Produkt>(url, produkt , this.httpOptions);
//   }

//   /**
//    * Produkt mit der übergebenen ID wird persisiten aus DB gelöscht
//    * @param id des Produktes das persistent gelöscht werden soll
//    * @returns eben gelöschtes Produkt
//    */
//   deleteProdukt(id: number): Observable<Produkt>{
//     const url = `${this.produktUrl}/delete/${id}`;
//     return this.httpClient.delete<Produkt>(url, this.httpOptions);
//   }

//   /**
//    * Podukte mit angegebener Kategorie werden zurück geliefert
//    * @param kategorie deren Produkte geliefert werden sollen
//    * @returns Alle Prdukte auf die, die Kategorie zutrifft
//    */
//   getProdukteByKategorie(kategorie: string): Observable<Produkt[]>{
//     const url = `${this.produktUrl}/kategorie/${kategorie}`;
//     return this.httpClient.get<Produkt[]>(url);
//   }

//   /**
//    * Alle verschiedenen Kategorien der DB werden geliefert
//    * @returns Alle Kategorien als JSON 
//    */
//   getKategorien(): Observable<Kategorie[]>{
//     const url = `${this.produktUrl}/kategorie`;
//     return this.httpClient.get<Kategorie[]>(url);
//   }

//   getProdukteByBestellnummer(bestellnummer: number): Observable<ProdukteKoch[]>{
//     const url = `${this.produktUrl}/bestellnummer/${bestellnummer}`;
//     return this.httpClient.get<ProdukteKoch[]>(url);
//   }

//   updateProduktZubereitet(id: number): Observable<Produkt[]>{
//     const url = `${this.produktUrl}/zubereitetUpdate/${id}`;
//     return this.httpClient.get<Produkt[]>(url);
//   }

//   updateBestellungsPositionByID(id: number): void {
//     const url = `http://localhost:3000/bestellungsPosition/update/zubereitet/${id}`;
//   }
// }

