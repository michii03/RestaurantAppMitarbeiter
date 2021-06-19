import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mailLager } from '../_interfaces/mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  mailUrl = 'http://localhost:3000/mail';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  sendmail(daten: mailLager) {
    const url = `${this.mailUrl}/sendmailLager`;
    this.httpClient.post<mailLager>(url, daten, this.httpOptions).subscribe();
  }

}
