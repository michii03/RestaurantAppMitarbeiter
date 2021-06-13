import { Component, OnInit } from '@angular/core';
import { bestellung } from '../../_interfaces/bestellung';
import { Router } from '@angular/router'
import { BestellungService } from 'src/app/_service/bestellung.service';


@Component({
  selector: 'app-bestellung',
  templateUrl: './bestellung.page.html',
  styleUrls: ['./bestellung.page.scss'],
})

export class BestellungPage implements OnInit {

  constructor(private router: Router, private bestellungService: BestellungService) { }

  ngOnInit() {
    this.getBestellungen();
  }

  bestellungen  : bestellung[] = [];
  ausgewaehlt   : number[] = [];

  navigate(id : number) : void {
    this.router.navigateByUrl("/produkte", {state: {produkte: this.getProdukte(id)}});
  }

  getProdukte(id: number) {
    for(let i = 0; i < this.bestellungen.length; i++) {
      if (id == this.bestellungen[i].id) {
        return this.bestellungen[i].produkte;
      }
    }
  }

  getBestellungen() : void {
    this.bestellungService.getBestellungen().subscribe(item => this.bestellungen = item);
  }

  getTime(time: string) {
    return new Date(time);
  }

  getProzent(index : number): number {
     let anzahl = 0;
     let zubereitet = 0;

     for (let i = 0; i < this.bestellungen[index].produkte.length; i++) {
       if (this.bestellungen[index].produkte[i].zubereitet == "true") zubereitet++;
       anzahl++;
     }

     if (anzahl == 0) return 0;

     return zubereitet / anzahl;
   }
}
